const express = require('express');
const router = express.Router();
const mail = require("../process/mail.js")
const nodemailer = require("nodemailer")

const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const secretInfo = require("../process/protect.js");


const crypto = require("crypto");
const info = require("../template/Info.js")
const template = require("./literal/template.js");
const salt = secretInfo.password.salt

router.get("/",  (req, res)=>{
    let userId = req.session.userID
    let text = info.data.text
    if(userId){
        text = info.data.userId
    }
    res.send(template.pwFindTemp(text))
})

router.post("/", (req,res)=>{
    let randomPass = Math.floor((Math.random() + 1) * 1234567890)
    let saltPw = "" + randomPass * salt
    let hashPassword = crypto.createHash(secretInfo.password.hash).update(saltPw).digest(secretInfo.password.digest)
    db.query(`selct * from ${info.table.user}`, (err , results)=>{
        if(err) console.error(err)
        results.forEach(items =>{
            if(items.id == req.body.id && items.email == req.body.email){
                db.query(`UPDATE ${info.table.user} SET password= "${hashPassword}" WHERE id = "${req.body.id}"`, (err)=>{
                    if(err) console.error(err)
                })

                main(req.body.email, randomPass)
            }
            else{
                console.log("회원 정보가 일치하지 않습니다.")
            }
        })
    })
    res.redirect("/")
})
module.exports = router

const main = async(email, pw)=>{
    let transporter = nodemailer.createTransport(mail)
    let info = await transporter.sendMail({
        from : mail.auth.user,
        to: email,
        subject : `임시 비밀번호 전송해 드립니다.`,
        html : `<b>임시비밀번호: ${pw}</b>`
    })
    console.log('Message sent: %s', info.messageId);
}