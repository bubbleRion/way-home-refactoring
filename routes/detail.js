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
// gari getget id로 req.params사용
router.get("/board:id", (req,res)=>{
    // 회원 체크
    let userId = req.session.userID
    // 댓글 분류작업
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
        // 댓글 담는 배열 생성
        let commentText = comment.map(item=>{
            if(item.user !== "" || item.comment !== ""){
                return `<div>${item.user === "" ? "익명" : item.user} : ${item.comment}</div>`
            }
            else{
                return ""
            }
        }).join("")//합쳐줌
    
        // 게시글 조회
        db.query(`select * from ${info.table.board}`,(err, results)=>{
            if(err)console.error(err)
            // 로그인 텍스트
            let text = info.data.text
            // 댓글 입력 창
            let commentInput = ""
            // 유저가 있다면 로그인 => 로그아웃 / 댓글입력창 생성
            if(userId){
                text = `<a href="/logout" class="signIn">로그아웃</a>`
                commentInput = `<div class="wr">
                <form action="/comment" method="post">
                <input type="hidden" name="seq" value="${req.params.id}">
                <input type="text" name="comment" placeholder="댓글쓰기">
                </form>
                </div>`
            }
            // result변수에 게시글db내용 배열로 가공
            let result = results.map(item=>{
                if(req.params.id == item.seq){
                return `<div>이름 : ${item.name}</div>
                <div>성별 : ${item.gender}</div>
                <div>종 : ${item.breed}</div>
                <div>나이 : ${item.age}</div>
                <div>중성화 유무 : ${item.isNeutering}</div>
                <div>잃어버린 장소 : ${item.location}</div>
                <div>특이사항 : ${item.uniqueness}</div>`
                }
            }).join("")
            // 게시글 db내용 forEach돌려서 해당 게시글을 송출
            results.forEach(item=>{
                let isLogin = userId == item.userID ? `<div>
                    <form action="/update" method="post">
                    <input type="hidden" name="seq" value="${item.seq}">
                    <input type="submit" value="글 수정" class="update">
                    </form>
                  </div>
                  <div>
                    <form action="/delete" method="post">
                    <input type="hidden" name="seq" value="${item.seq}">
                    <input type="submit" value="글 삭제" class="delete">
                    </form>
                  </div>` : ""
                // db에 있는 이미지 주소 경로 가공 
                let image = item.image.replace("s", "s/")
                // 해당 게시글만 송출
                if(req.params.id == item.seq){
                    res.send(template.detailTemp(text, image, isLogin, result, commentText, commentInput))
                }
            })
        })
    })
})
module.exports = router;