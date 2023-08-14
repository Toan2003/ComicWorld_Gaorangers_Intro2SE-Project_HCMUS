// import { Request, Response, NextFunction } from 'express'
const authorize = require('../controller/authorize')
const getLogin = authorize.getLogin
const postSignup = authorize.postSignup

const express = require('express')
const route = express.Router()

route.post('/authorize/login', getLogin);

route.post('/authorize/signup',postSignup);

route.get('authorize/login', (req, res) => {
    console.log("here1111")
    console.log(req.body)
    res.send('login')}
);

module.exports = route