const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql");
const db = mysql.createConnection(conn);

const info = require("../template/Info.js");
const template = require('./literal/template.js');

router.get("/board:id", (req,res)=>{
    let userId = info.data.userId
    userId = req.session.userID
    
    db.query(`select * from ${info.table.comment}`, (err,results)=>{
        let comment = results.map(item=>{
            let userComment = {
                user : "",
                comment : "",
            }
            if(item.seq == req.params.id){
                userComment.user = item.user
                userComment.comment = item.comment
            }
            return userComment
        })

        let commentText = comment.map(item=>{
            if(item.user !== "" || item.comment !== ""){
                return `<div>${item.user === "" ? "익명" : item.user} : ${item.comment}</div>`
            }
            else{
                return ""
            }
        }).join("")

        db.query(`select * from ${info.table.board}`,(err, results)=>{
            if(err)console.error(err)

            let text = info.data.text
            let commentInput = ""
            let writeBox = ""
            if(userId){
                text = `<a href="/logout" class="signIn">로그아웃</a>`
                commentInput = `<div class="wr">
                <form action="/comment" method="post">
                <input type="hidden" name="seq" value="${req.params.id}">
                <input type="text" name="comment" placeholder="댓글쓰기">
                </form>
                </div>`
            }
            let index = req.params.id
            let result = results.map(item=>{
                return `<div>이름 : ${item.name}</div>
                <div>성별 : ${item.gender}</div>
                <div>종 : ${item.breed}</div>
                <div>나이 : ${item.age}</div>
                <div>중성화 유무 : ${item.isNeutering}</div>
                <div>잃어버린 장소 : ${item.location}</div>
                <div>특이사항 : ${item.uniqueness}</div>`
            })
            
            results.forEach(item=>{
                let image = item.image.replace("s", "s/")
                if(req.params.id == item.seq){
                    res.send(template.detailTemp(text, item.image.replace("s", "s/"), userId, result, item.seq, commentText, commentInput))
                }
            })
        })
    })
})
module.exports = router;