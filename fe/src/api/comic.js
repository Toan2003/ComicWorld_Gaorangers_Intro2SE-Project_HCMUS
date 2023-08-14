import axiosClient from "./axiosConnect"

async function getComic(idComic, idMember) { 
    link = 'comic/' + idComic
    return await axiosClient.get(link,idMember);
}

async function getChapter(idChapter) { 
    link = 'comic/chapter' + '/' + idChapter
    return await axiosClient.get(link);
}

async function getSearhComic(name) { 
    link = 'comic/' + name
    return await axiosClient.get(link);
}

export {getComic, getChapter, getSearhComic}