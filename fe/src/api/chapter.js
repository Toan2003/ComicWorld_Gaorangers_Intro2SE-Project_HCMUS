import {axiosClient} from "./axiosConnect"
import { convertBase64 } from "./convertImage";
async function getChapter(idChapter) { 
    console.log(idChapter)
    let link = '/chapter/getOneChapter/'  + idChapter
    return await axiosClient.get(link);
}

async function getAllChapterOfComic(idComic) { 
    let link = '/chapter/getAllChapterOfComic/'  + idComic
    return await axiosClient.get(link);
}

async function postCreateChapter(idMember, idComic, listChapter1, chapterName) { 
    let link = '/chapter/createChapter'
    let list = []
    for (let i = 0; i < listChapter1.length; i++) {
        list.push(await convertBase64(listChapter1[i]))
    }
    // console.log(list)
    let data = {
        idMember: idMember,
        idComic : idComic,
        chapterName: chapterName,
        listChapter: list
    }
    // console.log(data)
    return await axiosClient.post(link,data);
}


export {
    getChapter,
    getAllChapterOfComic,
    postCreateChapter
}