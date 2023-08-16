import axiosClient from "./axiosConnect"

async function getChapter(idChapter) { 
    let link = '/chapter/getOneChapter/'  + idChapter
    return await axiosClient.get(link);
}

async function getAllChapterOfComic(idComic) { 
    let link = '/chapter/getAllChapterOfComic/'  + idComic
    return await axiosClient.get(link);
}


export {
    getChapter,
    getAllChapterOfComic
}