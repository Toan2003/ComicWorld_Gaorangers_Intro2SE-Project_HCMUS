import axiosClient from "./axiosConnect"

async function getComic(id) { 
    link = 'comic/' + id
    return await axiosClient.get(link);
}

async function getChapter(name,id) { 
    link = 'comic/chapter' + name + '/' + id
    return await axiosClient.get(link);
}

async function getSearhComic(name) { 
    link = 'comic/' + name
    return await axiosClient.get(link);
}

export {getComic, getChapter, getSearhComic}