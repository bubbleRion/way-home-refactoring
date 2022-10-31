const express = require('express');
const router = express.Router();
const conn = require("../process/db.js")

const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.post("/", (req , res)=>{
    let indexSeq = req.body.indexSeq
    db.query(`delete from ${info.table.comment} where seq=${indexSeq};`, (err)=>{
        if(err) console.error(err)
    })
    db.query(`delete from ${info.table.board} where seq=${indexSeq};`, (err)=>{
        if(err) console.error(err)
        res.redirect("/board")
    })
})
module.exports = router