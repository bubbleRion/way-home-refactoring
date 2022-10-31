const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);

const multer = require("multer")
const path = require("path")

const info = require("../template/Info.js")
const template = require("./literal/template.js");

let count = info.data.Count
router.get("/", (req, res)=>{
    let userId = info.data.userId
    userId = req.session.userID

    db.query(`select * from ${info.table.board}`, (err, results)=>{
        if(err) console.error(err)
        count = (results[results.length -1].seq) + 1
    })

    res.send(template.createTemp(count))
})

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      },
    }),
  });

router.post("/", upload.single("image"), (req , res)=>{
    let body = req.body
    let userId = info.data.userId
    userId = req.session.userId

    db.query(`insert into ${info.table.board}(seq, location, breed, gender, age, isNeutering, name, uniqueness, image, userID) values(${count}, "${body.location}", "${body.breed}", "${body.gender}", "${body.age}", "${body.isNeutering}", "${body.name}", "${body.uniqueness}" , "${req.file.path}", "${userId}")`, (err)=>{
        if(err) console.error(err)
        res.redirect("/board")
    })
})
module.exports = router