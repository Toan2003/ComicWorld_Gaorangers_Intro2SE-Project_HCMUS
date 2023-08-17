
const controller = require('../controller/comic')
const express = require('express')
const route = express.Router()

route.get('/comic/getOneComic/:idComic', controller.getOneComic)
route.get('/comic/getAllComic', controller.getAllComic)
route.get('/comic/getRankingBoard', controller.getRankingBoard)
route.get('/comic/getFollowedComic/:idMember', controller.getFollowedComic)
route.get('/comic/comment',(req,res) =>{console.log('still developing')})
route.get('/comic/search',controller.getSearchComic)
route.get('/comic/type/:type',controller.getComicAccordingToType)

route.post('/comic/create', controller.postCreatComic) 


module.exports = route