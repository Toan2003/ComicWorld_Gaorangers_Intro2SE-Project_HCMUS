// import { Request, Response, NextFunction } from 'express'
import {getLogin, postSignup} from '../controller/authorize.js'

const express = require('express')
const route = express.Router()

route.get('/login', getLogin(req,res))
route.post('/signup',postSignup(req, res))

module.exports = route