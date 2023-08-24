const database = require('../model/comic')
const Cloudinary =  require('cloudinary').v2;
          
Cloudinary.config({ 
    cloud_name: 'comicimage',
    api_key: '648687645831283', 
    api_secret: 'JC3Pf5ilCtzv0bJj4TV00pwH4cI'  
});

async function getOneComic(req,res) {
    let idComic = req.params.idComic
    let idMember = req.params.idMember
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
            message: 'idComic or idMember is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    if (idMember.length != 24) {
        idMember = null
    }
    let result = await database.returnForOneComic(idMember,idComic)
    // console.log(result)
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
    // console.log(id)
    if (id.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idMember is invalid',
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
    // console.log(name)
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
        // console.log('loi')
        // console.log(err)
        return res.json({
            isSuccess: false,
            message:'request Failure',
            status: res.statusCode,
            data: ''
    })})
    if (result) {
        // console.log('thanhcong')
        // console.log(result)
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

async function postCreateComic(req,res) {
    // console.log("here")
    // let a = req.body.file
    let {name,date,group,idMember,type,status,file} = req.body
    // console.log(req.body)

    // console.log(name,date,group,idMember,type,status,coverURL)
    if (name == null || date == null || group == null || idMember == null || type == null || status == null) {
        return res.json({
            isSuccess: false,
            message: 'name, date, author, type, status, description is missing',
            status: res.statusCode,
            data: ''
        })
    }
    const result1 = await Cloudinary.uploader
    .upload(file,{
        folder: 'CoverImage'
    })
    .catch(error=>{
        console.log(error)
        return res.json({
            isSuccess: false,
            message: 'error of uploading to Cloudinary',
            status: res.statusCode,
            data: ''
        })
    });
    // console.log(result1)
    let coverURL = result1.secure_url
    // idMember = '64d8ed6698409d70ef8a58c6'
    // group = 'Imyourhope'
    if (idMember.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idMember is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.createComics(name,type,status,date,group,idMember,coverURL)
    .catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'Failed to create becasue of database',
            status: res.statusCode,
            data: ''
        });
    })
    // console.log(result)
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
    // console.log(idMember, idComic)
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
    let result = await database.followOneComic(idComic, idMember)
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
    // console.log(idMember, idComic)
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
    let result = await database.unfollowOneComic(idComic, idMember)
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
            isSuccess: false,
            message: 'fail to cancel following',
            statusbar: res.statusCode,
            data: ''
        })
    }
}

async function getReturnComicByUploader(req,res) {
    let idUploader = req.params.idUploader;
    // console.log(idUploader);
    if (idUploader == null || idUploader.length != 24 || idUploader == '') {
        return res.json({
            isSuccess: false,
            message: 'idMember is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.returnComicsByUploader(idUploader)
    .catch((err)=>{
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'fail because of database',
            status: res.statusCode,
            data: ''
        })
    })
    
    if (result != null) {
        return res.json({
            isSuccess: true,
            message:'request Successfully',
            status: res.statusCode,
            data: {
                listComic: result
            }
        })
    } else {
        return res.json({
            isSuccess: false,
            message:'request Failure',
            status: res.statusCode,
            data: ''
        })
    }
}

async function postAddComment(req, res) {
    let {idMember, idComic, content} = req.body
    if (idMember == null || idComic == null) {
        res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            statusbar: res.statusCode,
            data: ''
        })
    }
    if (content == null || content.length == 0) {
        res.json({
            isSuccess: false,
            message: 'content is missing',
            statusbar: res.statusCode,
            data: ''
        })
    }
    let result = await database.newComment(idComic, idMember, content)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'comment successfully',
            statusbar: res.statusCode,
            data: ""
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'fail to comment',
            statusbar: res.statusCode,
            data: ''
        })
    }
}

async function postRating(req, res) {
    // console.log('postRating')
    let {idMember, idComic,star} = req.body
    if (idMember == null || idComic == null) {
        res.json({
            isSuccess: false,
            message: 'idComic or idMember is missing',
            statusbar: res.statusCode,
            data: ''
        })
    }
    if (idMember.length != 24 || idComic.length != 24) {
        res.json({
            isSuccess: false,
            message: 'idComic or idMember is invalid',
            statusbar: res.statusCode,
            data: ''
        })
    }
    if (star <0 || star > 5) {
        res.json({
            isSuccess: false,
            message:'star is invalid',
            statusbar: res.statusCode,
            data: ''
        })
    } 
    // console.log(idMember, idComic, star)
    let result = await database.ratingComic(idComic, idMember, star)
    // console.log(result)
    if (result) {
        return res.json({
                    isSuccess: true,
                    message: 'rating successfully',
                    statusbar: res.statusCode,
                    data: ""
                })
    } else {
        return res.json({
            isSuccess: false,
            message: 'fail to rating',
            statusbar: res.statusCode,
            data: ''
        })
    }
}

async function getComment(req,res) {
    let {idComic} = req.params
    if (idComic == null || idComic.length == 0) {
        return res.json({
            isSuccess: false,
            message: 'idComic is missing',
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
    let result = await database.returnComments(idComic).catch(err => {
        return res.json({
            isSuccess: false,
            message:'fail because of database',
            status: res.statusCode,
            data: ''
        })
    });
    if (result!= null) {
        return res.json({
            isSuccess: true,
            message:'get comments successfully',
            status: res.statusCode,
            data: {
                listComment: result
            }
        })
    } else {
        return res.json({
            isSuccess: false,
            message:'get comments failed',
            status: res.statusCode,
            data: ''
        })
    }
}

async function getIsRating(req,res) {
    let {idComic, idMember}=req.params
    // console.log(idComic, idMember)
    if (idComic == null || idComic.length == 0 ) {
        return res.json({
            isSuccess: false,
            message: 'idComic is missing',
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
    if (idMember != 'null' &&  idMember.length != 24) {
        return res.json({
            isSuccess: false,
            message: 'idMember is invalid',
            status: res.statusCode,
            data: ''
        })
    }
    if (idMember == 'null') {
        idMember = null
    }
    let {star, isRating} = await database.isRating(idComic, idMember)
    .catch((err) => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message:'fail because of database',
            status: res.statusCode,
            data: ''
        })
        // exit(0)
    })
    // console.log(isRating)
    //  console.log(star)
    if (isRating != null) {
        return res.json({
            isSuccess: true,
            message:'rated',
            status: res.statusCode,
            data: {
                star: star
            }
        })
    } 
    
    else {
        return res.json({
            isSuccess: true,
            message:'did not rate',
            status: res.statusCode,
            data: {
                star: star
            }
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
    getReturnComicByUploader,

    postCreateComic,
    postAddFollowComic,
    postCancelFollowComic,

    postAddComment,
    getComment,
    postRating,
    getIsRating
}