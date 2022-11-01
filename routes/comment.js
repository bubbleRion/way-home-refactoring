// 모듈연결
const express = require('express');
const router = express.Router();
// db 연결
const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);
// info와 템플릿 연결
const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.post("/", (req , res)=>{
    // 회원 정보 담기
    let userId = req.session.userID
    let body = req.body
    if(userId){
        db.query(`insert into ${info.table.comment}(seq , user, comment) values(${body.seq}, "${userId}", "${body.comment}")`, (err)=>{
            if(err) console.error(err)
        })    
    }
    res.redirect(`/board${body.seq}`)
})
module.exports = router