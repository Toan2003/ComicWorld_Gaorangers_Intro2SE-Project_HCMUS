import axiosClient from "./axiosConnect"

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
    let link = '/comic/getFollowedComic'
    return await axiosClient.get(link,idMember);
}

//comment
//search
async function getSearhComic(name) { 
    let link = '/comic/search/' + name
    return await axiosClient.get(link);
}

async function getComicAccordingToType(type) { 
    console.log(type)
    let link = '/comic/type'
    return await axiosClient.post(link,type);
}
//type


export {
    getComic, 
    getSearhComic, 
    getAllComic, 
    getRankingBoard, 
    getFollowedComic,
    getComicAccordingToType
} 
