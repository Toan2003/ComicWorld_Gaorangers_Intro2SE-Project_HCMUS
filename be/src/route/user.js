const controller = require('../controller/user')
const express = require('express')
const route = express.Router()

route.get('/user/followingComic',(req,text) =>{console.log('still developing')})
route.post('/user/changeRole',controller.postChangeRole)
route.get('/user/searchUser',controller.getSearchUser)


module.exports = route