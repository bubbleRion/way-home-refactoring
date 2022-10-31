const express = require('express');
const router = express.Router();

const path = require("path");
const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../pages", "idFind.html"))
})

router.post("/", (req,res)=>{
    let body = req.body
    db.query(`select * from ${info.table.user}`, (err, results)=>{
        if(err) console.error(err)
        let result = results.map((item)=>{
            if(body.name == item.name && body.email == item.email){
                return item.id
            }
        })
        let idResult = result.filter((item)=>{
            return item !== undefined
        })
        res.send(`<h1>아이디는 ${idResult[0]}입니다.</h1><a href="/">메인으로 가기</a>`)
    })
})
module.exports = router