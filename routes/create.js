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
// 이미지 업로드를 위한 path와 multer
const multer = require("multer")
const path = require("path")

// 게시글 순차적 증가를 위한 초기값 1을 count 변수에 담아주기
let count = info.data.Count

router.get("/", (req, res)=>{
    
    // 실종동물 게시판 연결
    db.query(`select * from ${info.table.board}`, (err, results)=>{
      // 에러체크
        if(err) console.error(err)
        // 게시글 번호 count + 1로 재할당
        count = (results[results.length -1].seq) + 1
    })
    // 글생성 페이지 템플릿에 다음 게시글 번호를 담아 방출
    res.send(template.createTemp(count))
})
// multer 쓰는 법
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
// post로 받는다.
router.post("/", upload.single("image"), (req , res)=>{
  // body는 req.body~
    let body = req.body
    // 회원체크
    let userId = req.session.userID
    // 게시판 db열고 받은 값들 넣어주기
    db.query(`insert into ${info.table.board}(seq, location, breed, gender, age, isNeutering, name, uniqueness, image, userID) values(${count}, "${body.location}", "${body.breed}", "${body.gender}", "${body.age}", "${body.isNeutering}", "${body.name}", "${body.uniqueness}" , "${req.file === undefined ? "uploads1666323257686.jpg" : req.file.path}", "${userId}")`, (err)=>{
        if(err) console.error(err)
        res.redirect("/board")
    })
})
module.exports = router