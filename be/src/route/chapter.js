
const controller = require('../controller/chapter')
const express = require('express')
const route = express.Router()

route.get('/chapter/:idChapter', controller.getChapter)

module.exports = route