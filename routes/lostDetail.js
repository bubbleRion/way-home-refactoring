const express = require('express');
const router = express.Router();
const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.get("/lostBoard:id", (req,res)=>{
    let userId = req.session.userID
    const imageURL = "http://www.daejeon.go.kr/"
    db.query(`select * from ${info.table.lostBoard}`, (err, results)=>{
        if(err) console.error(err)
        let text = info.data.text
        let commentInput = ""
        if(userId){
            text = info.data.userText
            commentInput = `<div class="wr">
            <form action="/comment" method="post">
              <input type="hidden" name="seq" value="${req.params.id}">
              <input type="text" name="comment" placeholder="댓글쓰기">
            </form>
            </div>`
        }
        let result2 = ""
        results.forEach(item =>{
            result2 = `<div>입양상태 : ${item.adoptionStatusCd}</div>
            <div>성별 : ${item.gender}</div>
            <div>종 : ${item.breed}</div>
            <div>나이 : ${item.age}</div>
            <div>발견장소 : ${item.foudPlace}</div>
            <div>특이사항 : ${item.memo}</div>`    
            let image = item.filePath === "" ? `<img src="/uploads/1666313512904.jpg" alt="이미지 없음"/>` : `<img src="${imageURL + item.filePath}" alt="이미지 없음"/>`
            
            if(req.params.id == item.animalSeq){
                
                res.send(template.lostDetailTemp(text, image, result2, commentInput))
            }
        })
    })

})
module.exports = router