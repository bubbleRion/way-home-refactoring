// 모듈연결
const express = require('express');
const router = express.Router();
const path = require("path");

// info와 템플릿 연결
const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.get("/", (req,res)=>{
    // 회원 체크
    let userId = req.session.userID
    // 특정 인물의 텍스트는 다르게 마크업 되있기에 juText로 불러와줌
    let text = info.data.juText
    if(userId){
        // 위와 동일
        text = info.data.juUserText
    }
    res.send(template.indexTemp(text))
})
module.exports = router