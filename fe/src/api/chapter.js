import axiosClient from "./axiosConnect"

async function getChapter(idChapter) { 
    let link = '/chapter' + '/' + idChapter
    return await axiosClient.get(link);
}


export {
    getChapter
}