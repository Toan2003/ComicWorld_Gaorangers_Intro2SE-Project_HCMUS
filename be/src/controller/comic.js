const database = require('../model/comic')

async function getOneComic(req,res) {
    let idComic = req.params.idComic
    let idMember = req.body.idMember
    // console.log(idMember)
    // mongoose.ObjectId.isValid(idMember)
    if (idComic == '' || idComic == null) {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            status: res.statusCode,
            data: ''
        })
    }
    if (idComic.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic is invalid',
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

async function getAllComic(req,res) {
   
    let result = await database.returnAllComic()
    .catch(
        err => {
            console.log(err)
            return res.json({
                isSuccess: false,
                message: 'request Failure',
                status: res.statusCode,
                data: ''
            })
        }
    )
    return res.json({
        isSuccess: true,
        message: 'request Successfully',
        status: res.statusCode,
        data: {
            listComic: result
        }
    })
}

async function getRankingBoard(req,res) {
    let sorted = await database.sortComicBXH().catch(
        error => {
            console.log(error)
            return res.json({
                isSuccess: false,
                message: 'request Failure',
                status: res.statusCode,
                data: ''
            })
        }
    )
    list = []
    for (let i =0; i<5; i++) {
        list.push(sorted[i]) 
    }
    return res.json({
        isSuccess: true,
        message: 'request Successfully',
        status: res.statusCode,
        data: {
            rankingList: list
        }
    })
}

async function getFollowedComic(req,res) {
    id = req.params.id
    if (id.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    let List = await database.returnFollowingComics(id).
    catch(
        error => {
            console.log(error)
            return res.json({
                isSuccess: false,
                message: 'request Failure',
                status: res.statusCode,
                data: ''
            })
        }
    )
    return res.json({
        isSuccess: true,
        message: 'request Successfully',
        status: res.statusCode,
        data: {
            followList: List
        }
    })
}
async function getsearchComic(req,res) {}

async function postCreatComic(req,res) {
}

async function getComicAccordingToType(req,res) {
    let type = req?.body?.type
    if (type == '' || type == null) {
        return res.json({
            isSuccess: false,
            message: 'type is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.filterType(type).
    catch((err) => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'request Failure',
            status: res.statusCode,
            data: ''
        })
    })
    return res.json({
        isSuccess: true,
        message:'request Successfully',
        status: res.statusCode,
        data: {
            listComic: result
        }
    })
}

module.exports = {
    getOneComic,
    getAllComic,
    getRankingBoard,
    getFollowedComic,
    getsearchComic,
    postCreatComic,
    getComicAccordingToType
}