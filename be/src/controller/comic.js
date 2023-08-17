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
    let id = req.params.idMember
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
async function getSearchComic(req,res) {
    let {name} = req.query
    console.log(name)
    if (name == '' || name == null){
        return res.json({
            isSuccess: false,
            message: 'name is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.searchComic(name)
    .catch(err => {
        console.log('loi')
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'request Failure',
            status: res.statusCode,
            data: ''
    })})
    if (result) {
        console.log('thanhcong')
        console.log(result)
        return res.json({
            isSuccess: true,
            message:'request Successfully',
            status: res.statusCode,
            data: {
                listComic: result
            }
        })
    } 
}

async function postCreatComic(req,res) {
    let {name,date,group,member,type,status,description,coverURL} = req.body
    
    if (name == null || date == null || group == null || member == null || type == null || status == null || description == null || coverURL == null) {
        return res.json({
            isSuccess: false,
            message: 'name, date, author, type, status, description, coverURL is missing',
            status: res.statusCode,
            data: ''
        })
    }
    if (idMember.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idMember is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.createComic(name,type,status,date,group,idMember,coverURL)
    .catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'Failed to create',
            status: res.statusCode,
            data: ''
        });
    })
    if (result) {
        return res.json({
            isSuccess: true,
            message:'Created successfully',
            status: res.statusCode,
            data: ''
        })
    } else {
        return res.json({
            isSuccess: false,
            message:'Failed to create',
            status: res.statusCode,
            data: ''
        })
    }
}

async function getComicAccordingToType(req,res) {
    let type = req?.params?.type
    // console.log(type)
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

async function postAddFollowComic(req, res) {
    let {idMember,idComic} = req?.body
    console.log(idMember, idComic)
    if (idMember == null || idComic == null || idMember == '' || idComic == '') {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            statusbar: res.statusCode,
            data: ''
        });
    }
    if (idMember.length != 24 || idMember.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is invalid',
            statusbar: res.statusCode,
            data: ''
        });
    }
    let result = await database.addFollowComic(idMember, idComic)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'folow comic successfully',
            statusbar: res.statusCode,
            data: {
                isFollowed: result
            }
        });
    } else {
        return res.json({
            isSuccess: true,
            message: 'can not follow comic',
            statusbar: res.statusCode,
            data: ''
        })
    }
}

async function postCancelFollowComic(req, res) {
    let {idMember,idComic} = req?.body
    console.log(idMember, idComic)
    if (idMember == null || idComic == null || idMember == '' || idComic == '') {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            statusbar: res.statusCode,
            data: ''
        });
    }
    if (idMember.length != 24 || idMember.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idComic or idMember is invalid',
            statusbar: res.statusCode,
            data: ''
        });
    }
    let result = await database.cancelFollowComic(idMember, idComic)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'cancel following successfully',
            statusbar: res.statusCode,
            data: {
                isFollowed: result
            }
        });
    } else {
        return res.json({
            isSuccess: true,
            message: 'fail to cancel following',
            statusbar: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    getOneComic,
    getAllComic,
    getRankingBoard,
    getFollowedComic,
    getSearchComic,
    getComicAccordingToType,
    
    postCreatComic,
    postAddFollowComic,
    postCancelFollowComic,
}