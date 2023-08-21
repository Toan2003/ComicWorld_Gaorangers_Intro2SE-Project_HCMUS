import {axiosClient} from "./axiosConnect"
// import {Cloudinary} from "@cloudinary/url-gen";
// import {cloud} from "./axiosConnect"
        
async function getComic(idComic, idMember) { 
    let link = '/comic/getOneComic/' + idComic + '/' + idMember
    return await axiosClient.get(link);
}

async function getAllComic() {
    let link = '/comic/getAllComic'
    return await axiosClient.get(link);
}

async function getRankingBoard() {
    let link = '/comic/getRankingBoard'
    return await axiosClient.get(link);
}

async function getFollowedComic(idMember) {
    let link = '/comic/getFollowedComic/' + idMember
    // console.log("dddd")
    // console.log(idMember)
    return await axiosClient.get(link);
}

//comment
//search
async function getSearhComic(name) { 
    let link = '/comic/search?name=' + name
    return await axiosClient.get(link);
}

async function getComicAccordingToType(type) { 
    let link = '/comic/type/' +type
    return await axiosClient.get(link);
}
//type

async function getReturnComicByUploader(idUploader) {
    let link = '/comic/returnComicByUploader/' + idUploader 
    return await axiosClient.get(link);
}

async function postCreateComic(name,date,group,idMember,type,status,cover) {
    // const cloud = new Cloudinary({cloud: { 
    //     cloud_name: 'comicimage',
    //     api_key: '648687645831283', 
    //     api_secret: 'JC3Pf5ilCtzv0bJj4TV00pwH4cI'  
    // }});
    // console.log(Cloudinary)
    let link = '/comic/create'
    // let coverURL = await Cloudinary.v2.uploader.upload(cover, {
    //     folder: "CoverImage"
    // },(error, result) => {
    //     console.log(error);
    //     console.log(result);
    // }).catch((error) => {
    //     console.log("fail to upload cover image");
    //     return null;
    // });
    let res = await axiosClient.post(link, {name,date,group,idMember,type,status,file: cover})
    return res
}

async function postAddFollowComic(idMember,idComic) {
    let link = '/comic/followComic'
    return await axiosClient.post(link, {idMember,idComic})
}
async function postUnfollowComic(idMember,idComic) {
    let link = '/comic/unfollowComic'
    return await axiosClient.post(link, {idMember,idComic})
}

async function postAddComment(idComic ,idMember,content) {
    let link ='/comic/addComment'
    return await axiosClient.post(link, {idMember, idComic, content})
}

async function postRating(idMember,idComic, star) {
    let link = '/comic/rating'
    return await axiosClient.post(link, {idMember, idComic, star})
}

async function getComment(idComic){
    let link ='/comic/getComment/' +idComic
    return await axiosClient.get(link)
}

async function isRating(idMember,idComic) {
    let link = '/comic/isRating/' + idComic + '/' + idMember
    return await axiosClient.get(link)
}
export {
    getComic, 
    getAllComic, 
    getRankingBoard, 
    getFollowedComic,
    getComicAccordingToType,
    getSearhComic,
    postCreateComic,
    postAddFollowComic,
    postUnfollowComic,
    getReturnComicByUploader,
    postRating,
    postAddComment,
    getComment,
    isRating
} 
