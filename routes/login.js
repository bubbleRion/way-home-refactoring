const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const path = require("path")

const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const secretInfo = require("../process/protect.js");


const sessionData = {}

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "..pages", "loginPage.html"))
})

router.post("/", (req,res)=>{
    let isLogin = false
    let isAdmin = false

    let body = req.body
    let id = body.id
    let password = body.password

    let userId = info.data.userId

    db.query(`select password from ${info.table.user} where id ="${id}"`, (err, results)=>{
        if(results[0] == undefined){
            console.log("아이디 틀림")
        }
        else if(id == "admin"){
            isAdmin = true
        }
        else{
            let saltPw = "" + password * secretInfo.password.salt
            let hashPassword = crypto.createHash(secretInfo.password.hash).update(saltPw).digest(secretInfo.password.digest)
            if(results[0].password === hashPassword){
                isLogin = true
                userId = id
            }
            else{
                isLogin = false
                isAdmin = false
            }
        }

        if(isLogin){
            console.log("로그인 성공")
            req.session.userID = userId
            req.session.save()
            req.session.touch({maxAge : 30 * 60 * 1000})
            if(req.session){
                sessionData[req.sessionID] = {id,password}

                res.setHeader("Set-Cookie", `${req.sessionID}=${req.sessionID}; path=/`)
                .cookie("connect_id", `${req.sessionID}`, {maxAge : 30 * 60 * 1000})
                .redirect("/")
            }
        }
        else if(isAdmin){
            console.log("관리자입니다.")
            req.session.userID = userId
            req.session.save()
            req.session.touch({maxAge : 30 * 60 * 1000})
            res
            .setHeader("Set-Cookie", `${req.sessionID}=${req.sessionID}; path=/`)
            .cookie("connect_Admin", `${req.sessionID}`, { maxAge: 5000 })
            .redirect("/admin")
        }
        else{
            console.log("로그인 실패")
            res.redirect("/")
        }
    })
})
module.exports = router