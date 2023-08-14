const database = require('../model/comic')

async function getOneComic(req,res) {
    let idComic = req.params.idComic
    let idMember = req.body.idMember
    // console.log(idMember)
    // mongoose.ObjectId.isValid(idMember)
    if (idComic == '') {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.returnForOneComic(idMember,idComic)
    console.log(result)
    if (result.oneComics) {
        return res.json({
            isSuccess: true,
            message: 'request Successfully',
            status: res.statusCode,
            data: {
                comic: result.oneComics,
                isFollowed: result.isFollowed
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



async function searhComic(req,res) {}

module.exports = {
    getOneComic,
    searhComic
}