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
    // 번호 체크
    let indexSeq = req.body.seq
    // 게시글에 달린 코멘트 삭제
    db.query(`delete from ${info.table.comment} where seq=${indexSeq};`, (err)=>{
        if(err) console.error(err)
    })
    // 게시글 삭제
    db.query(`delete from ${info.table.board} where seq=${indexSeq};`, (err)=>{
        if(err) console.error(err)
        res.redirect("/board")
    })
})
module.exports = router