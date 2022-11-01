const express = require('express');
const router = express.Router();

const conn = require("../process/db.js")
const mysql = require("mysql")
const db = mysql.createConnection(conn);

const info = require("../template/Info.js")
const template = require("./literal/template.js");

const imageURL = "http://www.daejeon.go.kr/"

router.get("/", (req, res)=>{
    db.query(`select * from ${info.table.lostBoard} where adoptionStatusCd like "%${req.query.result}%" or age like "%${req.query.result}%" or gender like "%${req.query.result}%" or breed like "%${req.query.result}%"  or animalSeq like "%${req.query.result}%" or foudPlace like "%${req.query.result}%" or memo like "%${req.query.result}%";`, (err , results)=>{
        if(err) console.error(err)
        let fileImages = null
        if(req.query.result.length > 1){
            fileImages = results.reverse().map(values=>{
                let image = values.filePath === "" ? "/uploads/1666313512904.jpg" : imageURL + values.filePath
                return `<a href="lostBoard${values.animalSeq}"><img alt="이미지" src="${image}"/><a>`
            })
        }
        else{
            fileImages = "<h1>검색어는 2글자 이상이어야 합니다.</h1>"
        }
        let images = ""
        let image
        
        if(typeof(fileImages) == "string"){
            image = fileImages
        }
        else if(typeof(fileImages) === "object"){
            const set = new Set(fileImages)
            let fileImage = [...set]
            images = fileImage.map(item=> item)
            image = images.join("")
        }
        else{
            image = ""
        }

        let userId = req.session.userID
        let text = info.data.text
        if(userId){
            text = info.data.userText
        }
        

        res.send(template.lostSearchTemp(text, image))
    })
})
module.exports = router
