const express = require('express');
const router = express.Router();
const conn = require("../process/db.js")

const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js")

router.post("/", (req , res)=>{
    let userId = info.data.userId
    userId = req.session.userID
    if(!userId){
        res.redirect("/logout")
    }
    let body = req.body
    db.query(`insert into ${info.table.comment}(seq , user, comment) values(${body.seq}, "${userId}", "${body.comment}")`, (err)=>{
        if(err) console.error(err)
        res.redirect(`/board${body.seq}`)
    })
})
module.exports = router