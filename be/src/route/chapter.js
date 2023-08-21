
const controller = require('../controller/chapter')
const express = require('express')
const route = express.Router()

route.get('/chapter/getOneChapter/:idChapter', controller.getChapter)
route.get('/chapter/getAllChapterOfComic/:idComic', controller.getAllChapter)

route.post('/chapter/createChapter', controller.postCreateChapter)

module.exports = route