
const controller = require('../controller/comic')
const express = require('express')
const route = express.Router()

route.get('/comic/getOneComic/:idComic', controller.getOneComic)
route.get('/comic/getAllComic', controller.getAllComic)
route.get('/comic/getRankingBoard', controller.getRankingBoard)
route.get('/comic/getFollowedComic', controller.getFollowedComic)
route.get('/comic/comment',(req,text) =>{console.log('still developing')})
route.get('/comic/search/:name',controller.getsearchComic)


route.post('/comic/create', controller.postCreatComic)

module.exports = route