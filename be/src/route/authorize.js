// import { Request, Response, NextFunction } from 'express'
import {login, signup} from '../service/authorize.js'

const express = require('express')
const route = express.Router()

route.get('/', login(req,res,next))
route.post('/',signup(req, res,next))

module.exports = route