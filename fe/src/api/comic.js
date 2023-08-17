import axiosClient from "./axiosConnect"

import cloud from "./axiosConnect"
        
async function getComic(idComic, idMember) { 
    let link = '/comic/getOneComic/' + idComic
    return await axiosClient.get(link,idMember);
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

async function postCreatComic(name,date,group,member,type,status,description,cover) {
    let link = '/comic/create'
    let coverURL = await cloud.uploader.upload(cover, {
        folder: "CoverImage"
    },(error, result) => {console.log(error);});
    return await axiosClient.post(link, {name,date,group,member,type,status,description,coverURL}).then
}

export {
    getComic, 
    getSearhComic, 
    getAllComic, 
    getRankingBoard, 
    getFollowedComic,
    getComicAccordingToType,
    getSearhComic,
    postCreatComic
} 
