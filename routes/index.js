const express = require('express');
const router = express.Router();
const path = require("path")

const info = require("../template/Info.js")
const template = require("./literal/template.js");

router.get("/", (req,res)=>{
    let userId = info.data.userId
    userId = req.session.userID
    let text = info.data.text
    if(userId){
        text = info.data.userText
    }
    res.send(template.indexTemp(text))
})
module.exports = router