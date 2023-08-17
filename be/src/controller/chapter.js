const database = require('../model/chapter')

async function getChapter(req,res) {
    let id= req.params.idChapter
    if (id == '' || id == null || id != 24) {
        return res.json({
            isSuccess: false,
            message: 'idChapter is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.getOneChapter(id)
    console.log(result)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'request Successfully',
            status: res.statusCode,
            data: {
                chapterName: result.chapterName,
                chapterImageId: result.chapterImageId
            }
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'request Failure',
            status: res.statusCode,
            data: ''
        })
    }
}

async function getAllChapter(req,res) {
    let id = req.params.idComic
    if (id == '' || id == null) {
        return res.json({
            isSuccess: false,
            message: 'idChapter is missing',
            status: res.statusCode,
            data: ''
        })
    }
    if (id.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idChapter is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.getAllChapter(id)
    console.log(result)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'request Successfully',
            status: res.statusCode,
            data: {
                listChapters: result
            }
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'request Failure',
            status: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    getAllChapter, 
    getChapter
}