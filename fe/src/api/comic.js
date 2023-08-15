import axiosClient from "./axiosConnect"

async function getComic(idComic, idMember) { 
    let link = '/comic/getOneComic' + idComic
    console.log(link)
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

async function getFollowedComic() {
    let link = '/comic/getFollowedComic'
    return await axiosClient.get(link);
}

async function getChapter(idChapter) { 
    let link = '/comic/chapter' + '/' + idChapter
    return await axiosClient.get(link);
}

async function getSearhComic(name) { 
    let link = '/comic/' + name
    return await axiosClient.get(link);
}

export {getComic, getChapter, getSearhComic, getAllComic, getRankingBoard, getFollowedComic} 