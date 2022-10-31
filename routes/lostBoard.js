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

let pageCountNum = 1

router.get("/", async(req,res)=>{
    const datas = await fetch(URL + queryParams + `&numOfRows=10&pageNo=${pageCountNum}`)
})