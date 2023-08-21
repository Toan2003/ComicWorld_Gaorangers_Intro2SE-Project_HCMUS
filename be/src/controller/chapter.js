const database = require('../model/chapter');
const { returnForOneComic } = require('../model/comic');
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

async function postCreateChapter(req,res) {
    // console.log(req.body)
    let {idComic,idMember,listChapter, chapterName} = req.body
    console.log(idComic)
    if (idComic == '' || idComic == null) {
        return res.json({
            isSuccess: false,
            message: 'idComic is missing',
            status: res.statusCode,
            data: ''
        })
    }
    if (idComic.length!= 24 || idMember.length!= 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    list = []
    for (let i = 0; i < listChapter.length; i++){
        let result = await Cloudinary.uploader
        .upload(listChapter[i],{
            folder: chapterName
        })
        .catch(error=>{
            console.log(error)
            return res.json({
                isSuccess: false,
                message: "can not upload to cloud",
                status: res.statusCode,
                data: ''
            })
        });
        list.push(result.secure_url)
    }
    console.log(list)
    result = await database.postCreateChapter().catch((error)=> {
        console.log(error)
        return res.json({
            isSuccess: false,
            message: 'chapter is not created because of database',
            status: res.statusCode,
            data: ''
        })
    })
    return res.json({
        isSuccess: true,
        message: 'chapter is created',
        status: res.statusCode,
        data: ''
    })
    // let isSuccess = true
    // if (isSuccess) {
       
    // } else {
    //     return res.json({
    //         isSuccess: false,
    //         message: 'comic is not existing',
    //         status: res.statusCode,
    //         data: ''
    //     })
    // }
}

module.exports = {
    getAllChapter, 
    getChapter,
    postCreateChapter
}