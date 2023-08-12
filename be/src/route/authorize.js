// import { Request, Response, NextFunction } from 'express'
const authorize = require('../controller/authorize')
const getLogin = authorize.getLogin
const postSignup = authorize.postSignup

const express = require('express')
const route = express.Router()

route.post('/login', (req, res) => {
    console.log("here")
    console.log(req.body)
    res.send('login')}
);

route.get('/login', (req, res) => {
    console.log("here1111")
    console.log(req.body)
    res.send('login')}
);

route.post('/signup',postSignup)

module.exports = route