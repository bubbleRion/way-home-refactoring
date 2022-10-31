const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")

router.post("/", (req, res)=>{
    let body = req.body
    let sql = `update ${info.table.board} set location = "${body.location}", breed = "${body.breed}", gender = "${body.gender}", age = "${body.age}", isNeutering = "${body.isNeutering}", name = "${body.name}", uniqueness = "${body.uniqueness}" , userID = "${body.userID}" where seq=${body.seq};`
    db.query(sql, (err)=>{
        if(err) console.error(err)
    })
    res.redirect(`/board${body.seq}`)
})
module.exports = router;