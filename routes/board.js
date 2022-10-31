const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");
router.get("/", (req, res)=>{
    let userId = info.data.userId
    userId = req.session.userID

    let text = info.data.text
    let writeText = info.data.writeText
    if(userId){
        text = info.data.userText
        writeText = info.data.userWriteText
    }
    db.query(`select * from ${info.table.board}`, (err, results)=>{
        if(err) console.error(err);

        let result = results.reverse().map((item)=>{
            return `<a href="board${item.seq}"><img src="${item.image.replace("s", "s/")}" alt=""/><a>
            `
        })
        let boardData = result.join("")

        res.send(template.boardTemp(text, writeText, boardData))
    })
})
module.exports = router