const database = require('../model/comic')

async function getComic(req,res) {
    let id = req.params.id
    if (id == '') {
        return res.json({
            isSuccess: false,
            message: 'id is missing',
            status: res.statusCode,
            data: {}
        })
    }
    let result = await database.getComic(id)
}

async function getChapter(req,res) {
    let id= req.params.id
    let name = req.params.name
    if (id == '' || name == '') {
        return res.json({
            isSuccess: false,
            message: 'id or name is missing',
            status: res.statusCode,
            data: {}
        })
    }
    let result = await database.getChapter(id, name)
}

async function searhComic(req,res) {}

module.exports = {
    getComic,
    getChapter,
    searhComic
}