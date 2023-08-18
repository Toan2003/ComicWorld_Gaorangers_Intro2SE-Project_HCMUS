const database = require('../model/chapter');
const { returnOneComic } = require('../model/comic');
const Cloudinary =  require('cloudinary').v2;
          
Cloudinary.config({ 
    cloud_name: 'comicimage',
    api_key: '648687645831283', 
    api_secret: 'JC3Pf5ilCtzv0bJj4TV00pwH4cI'  
});

async function getChapter(req,res) {
    let id= req.params.idChapter
    if (id == '' || id == null || id.length != 24) {
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
                chapterImageID: result.chapterImageID
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

async function createChapter(res,req) {
    let {idComic, listChapter, chapterName} = req.body
    console.log(idComic, listChapter, chapterName)
    if (idComic == '' || idComic == null) {
        return res.json({
            isSuccess: false,
            message: 'idComic is missing',
            status: res.statusCode,
            data: ''
        })
    }
    if (idComic.length!= 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    let {isSuccess} = await returnOneComic(idComic)
    if (isSuccess) {
        return res.json({
            isSuccess: false,
            message: 'database can not work',
            status: res.statusCode,
            data: ''
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'comic is not existing',
            status: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    getAllChapter, 
    getChapter,
    createChapter
}