const express = require('express');
const router = express.Router();
const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.post("/", (req , res)=>{
    let userId = req.session.userID
    db.query(`select * form ${info.table.board} where seq=${req.body.seq}`, (err,results)=>{
        if(err) console.error(err)
        results.forEach(item=>template(req.body.seq, userId, item.name, item.gender, item.breed, item.age, item.isNeutering, item.location, item.uniqueness))
    })
})
module.exports = router;