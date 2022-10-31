const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");
const { query } = require('express');

router.get("/", (req, res)=>{
    let userId = req.session.userId
    let text = info.data.text
    let writeText = info.data.writeText
    if(userId) {
        text = info.data.userText
        writeText = info.data.userWriteText
    }

    db.query(`select * from ${info.table.board} where location like "%${req.query.result}%" or breed like "%${req.query.result}%" or gender like "%${req.query.result}%" or age like "%${req.query.result}%"  or isNeutering like "%${req.query.result}%" or name like "%${req.query.result}%" or uniqueness like "%${req.query.result}%";`, (err, results)=>{
        if(err) console.error(err)
        let searchResult = ""
        let searchResultArray
        if(req,query.result.length  >1){
            searchResultArray = results.reverse().map(item=>{
                return `<a href="board${item.seq}"><img src="${item.image.replace("s", "s/")}" alt=""/><a>`
            })
        }
        const set = new Set(searchResultArray)
        let searchResultArraySet = [...set]
        searchResultArraySet.forEach(item=>{
            searchResult += item
        })

        res.send(template.searchTemp(text, writeText, searchResult))
        searchResult = ""
        searchResultArray = []
        searchResultArraySet = []
    })
})
module.exports = router;