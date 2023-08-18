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

async function postCreateComic(name,date,group,idMember,type,status,description,cover) {
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
    console.log(res)
    return 
}

async function postAddFollowComic(idMember,idComic) {
    let link = '/comic/followComic'
    return await axiosClient.post(link, {idMember,idComic})
}
async function postUnfollowComic(idMember,idComic) {
    let links = '/comic/unfollowComic'
    return await axiosClient.post(links, {idMember,idComic})
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
    getReturnComicByUploader
} 
