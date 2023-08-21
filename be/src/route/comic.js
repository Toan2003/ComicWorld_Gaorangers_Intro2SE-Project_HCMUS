
const controller = require('../controller/comic')
const express = require('express')
const route = express.Router()

route.get('/comic/getOneComic/:idComic/:idMember', controller.getOneComic)
route.get('/comic/getAllComic', controller.getAllComic)
route.get('/comic/getRankingBoard', controller.getRankingBoard)
route.get('/comic/getFollowedComic/:idMember', controller.getFollowedComic)
route.post('/comic/addComment',controller.postAddComment)
route.get('/comic/search',controller.getSearchComic)
route.get('/comic/type/:type',controller.getComicAccordingToType)
route.get('/comic/returnComicByUploader/:idUploader',controller.getReturnComicByUploader)

route.post('/comic/create', controller.postCreateComic) 
route.post('/comic/followComic', controller.postAddFollowComic)
route.post('/comic/unfollowComic', controller.postCancelFollowComic)
route.post('/comic/rating', controller.postRating)

module.exports = route
