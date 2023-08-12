const authorize = require('../controller/authorize.js')
const getLogin = authorize.getLogin
const postSignup = authorize.postSignup

const express = require('express')
const route = express.Router()

route.get('/login', getLogin)
route.get('/login', (req,res)=>{
    res.send("Log in")
}) 
route.post('/signup',postSignup)

module.exports = route