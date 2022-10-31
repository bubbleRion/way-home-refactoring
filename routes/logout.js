const express = require('express');
const router = express.Router();
const session = require('express-session')

const info = require("../template/Info.js")

router.get("/", (req, res)=>{
    req.session.userID = null
    res.redirect("/")
})
module.exports = router;
