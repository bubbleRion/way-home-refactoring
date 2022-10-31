// 모듇 express 가져오기
const express = require('express');
// express router 호출
const router = express.Router();
// node fetch 가져오기
const fetch = require("node-fetch")
// xmlToJson 가져오기
const convert = require("xml-js")
// 내 db정보 가져오기
const conn = require("../process/db.js")
// 모듈 mysql 가져오기
const mysql = require("mysql")
// db정보를 mysql에 넣어서 query 사용하게끔 처리
const db = mysql.createConnection(conn);
// api주소
const URL = "http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList"
// 깃허브에 올라가지 못하도록 처리한 나의 시리얼 키
const EncodingKEY = require("../process/apiKey.js")

// 쿼리 파람스, api주소와 시리얼 키를 연결
const queryParams = '?' + encodeURIComponent('serviceKey') + '=' + EncodingKEY;

const info = require("../template/Info.js")
const template = require("./literal/template.js");

let pageCountNum = 1

router.get("/", async(req,res)=>{
    const datas = await fetch(URL + queryParams + `&numOfRows=10&pageNo=${pageCountNum}`)
    const data = await datas.text()
    let result = convert.xml2json(data, {compact : true, spaces : 2})
    const imageURL = "http://www.daejeon.go.kr/"

    const filePaths = JSON.parse(result)
    const file = Object.values(filePaths)[1]
    let dbData = null

    if(file !== undefined){
        dbData = file.MsgBody.items.map(values=>{
            let adoption = values.adoptionStatusCd === undefined ? "" : values.adoptionStatusCd._text
            let changeAdoption = null
            let gender = values.gender === undefined ? "" : values.gender._text
            let changeGender = null
            // adoption 명시적으로 변경
            switch(adoption){
                case "1": 
                changeAdoption = "공고중"
                break;
                case "2": 
                changeAdoption = "입양가능"
                break;
                case "3": 
                changeAdoption = "입양예정"
                break;
                case "4": 
                changeAdoption = "입양완료"
                break;
                case "7": 
                changeAdoption = "주인반환"
                break;
                default:
                changeAdoption = "확인불가"
                break;
            }
            if(gender == "1"){
                changeGender = "암컷"
            }
            else if(gender == "2"){
                changeGender = "수컷"
            }
            else{
                changeGender = "수암"
            }
            let age = values.age === undefined ? "" : values.age._text
            let animalSeq = values.animalSeq === undefined ? "" : values.animalSeq._text
            let filePath = values.filePath === undefined ? "" : values.filePath._text
            let foundPlace = values.foundPlace === undefined ? "" : values.foundPlace._text
            let memo = values.memo === undefined ? "" : values.memo._text
            let breed = values.species === undefined ? "" : values.species._text
            let apiData = null
            // console.log(breed)
            apiData = {
                changeAdoption,
                age,
                animalSeq,
                filePath,
                foundPlace,
                changeGender,
                memo,
                breed
            }
        return apiData
        })
    }
    
    db.query(`select animalSeq, adoptionStatusCd, filePath from ${info.table.lostBoard}`, (err, results)=>{
        if(err) console.error(err)
        if(results == undefined || results == null){
            overRiding(dbData)
        }
        else{
            results.sort((a,b)=>{
                return Number(b.animalSeq) - Number(a.animalSeq)
            })
        }

        if(dbData !== undefined && dbData !== null){
            dbData.sort((a,b)=>{
                return Number(b.animlSeq) - Number(a.animalSeq)
            })
            let newData = dbData.filter(item => Number(item.animalSeq) > Number(results[0].animalSeq))
            let adoptionData = dbData.filter((item, index)=> Number(item.changeAdoption) !== Number(results[index + (pageCountNum - 1) * 10].adoptionStatusCd))
            let fileImageData = dbData.filter((item, index)=> item.filePath !== results[index + (pageCountNum -1) * 10].filePath)

            // new data add
            if(newData[0] !== undefined){
                console.log("데이터 추가")
                overRiding(newData)
            }

            if(pageCountNum > 3){
                pageCountNum = 1
            }
            pageCountNum++
            if(adoptionData[0] !== undefined){
                console.log("adoptionStatusCd update")
                adoptionUpdate(adoptionData)
            }

            if(fileImageData[0] !== undefined){
                console.log("filePath update")
                filePathUpdate(fileImageData)
            }
        }
    })

    db.query(`select * from ${info.table.lostBoard}`, (err , results)=>{
        if(err) console.error(err)
        results.sort((a,b)=>{
            return Number(b.animalSeq) - Number(a.animalSeq)
        })
        let fileImage = results.map(values=>{
            let image = values.filePath === "" ? "/uploads/1666313512904.jpg" : imageURL + values.filePath

            return `<a href="lostBoard${values.animalSeq}"><img alt="이미지 준비중" src="${image}"/></a>`
        })

        const images = fileImage.join("")
        let userId = req.session.userID

        let text = info.data.text
        if(userId) text = info.data.userText
        res.send(template.lostBoardTemp(text, images))
    })
})
module.exports = router
//  새로운 데이터 추가 해주는 함수
function overRiding(obj){
    obj.forEach((items)=>{
      db.query(`insert into ${info.table.lostBoard}(adoptionStatusCd, age, animalSeq, breed, filePath, foudPlace, gender, memo) values("${items.changeAdoption}", "${items.age}", "${items.animalSeq}", "${items.breed}", "${items.filePath}", "${items.foundPlace}", "${items.changeGender}", "${items.memo}")` ,(err, results)=>{
        if(err){
          console.error(err)
        }
      })
    })
  }
  // adoption(유기현황) 업데이트 해주는 함수
  function adoptionUpdate(obj){
    obj.forEach((item)=>{
      db.query(`update ${info.table.lostBoard} set adoptionStatusCd ="${item.changeAdoption}" where animalSeq=${item.animalSeq}` , (err, results)=>{
        if(err){
          console.error(err)
        }
      })
    })
  }
  // 사진경로 업데이트 해주는 함수
  function filePathUpdate(obj){
    obj.forEach((item)=>{
      db.query(`update ${info.table.lostBoard} set filePath="${item.filePath}" where animalSeq=${item.animalSeq}` , (err, results)=>{
        if(err){
          console.error(err)
        }
      })
    })
  }
  module.exports = router;