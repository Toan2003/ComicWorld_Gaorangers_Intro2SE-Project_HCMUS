import {axiosClient} from "./axiosConnect"
import { convertBase64 } from "./convertImage";
async function getChapter(idChapter) { 
    let link = '/chapter/getOneChapter/'  + idChapter
    return await axiosClient.get(link);
}

async function getAllChapterOfComic(idComic) { 
    let link = '/chapter/getAllChapterOfComic/'  + idComic
    return await axiosClient.get(link);
}

async function postCreateChapter(idComic, listChapter, chapterName) { 
    let link = '/chapter/createChapter'
    let list = await listChapter.map((i)=>{
        return convertBase64(i)
    })
    return await axiosClient.get(link,
        {
            idComic,
            chapterName,
            listChpater: list
        });
}


export {
    getChapter,
    getAllChapterOfComic
}