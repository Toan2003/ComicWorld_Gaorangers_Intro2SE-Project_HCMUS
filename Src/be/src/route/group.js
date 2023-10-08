const controller = require('../controller/group')
const express = require('express')
const route = express.Router()


route.post('/group/createGroup',controller.createGroup)
route.post('/group/addMemberToGroup',controller.addMemberToGroup)
route.get('/group/returnGroup',controller.returnGroup)

module.exports = route