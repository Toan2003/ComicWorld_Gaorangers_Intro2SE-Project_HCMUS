// const database=require('../database/database')
// const comic = require('./comic')
// const user = require("./user")
const {comics,user,chapter} = require('./schema')


async function getOneChapter(idChapter)
{
    const chapterChoose = await chapter.findById(idChapter)
    if(chapterChoose)
    {
        const updateView=chapterChoose.view +1
        await chapter.findOneAndUpdate({_id:idChapter},{view: updateView})
        // console.log(comic)
        // const newComic = await comics.findOne({"chapters.chapterid":idChapter})
        // let newView= newComic.view+1
        // await newComic.updateOne({$set:{view:newView}})
    }
    return chapterChoose
}

async function getAllChapter(idComic)
{
    const comicsChoose = await comics.findById(idComic)
    if (comicChoose)
    {
        const chooseComic= comicChoose.chapters
    }
    return chooseComic
}

async function postCreateChapter(chapterName1, chapterImage, idMember, idComic)
{
    const member = await user.findById(idMember)
    const newChapter=await chapter({chapterName: chapterName1, chapterImageID: chapterImage, uploader: member.username})
    newChapter.save()
    await comics.updateOne({_id:idComic})
    return true
}
module.exports= {getOneChapter, 
    getAllChapter,
    postCreateChapter
};