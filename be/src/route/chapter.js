
const controller = require('../controller/chapter')
const express = require('express')
const route = express.Router()

route.get('/chapter/getOneChapter/:idChapter', controller.getChapter)
route.get('/chapter/getAllChapterOfComic/:idComic', controller.getChapter)

module.exports = route