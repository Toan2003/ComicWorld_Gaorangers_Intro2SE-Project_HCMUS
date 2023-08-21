const mongoose=require('mongoose')
const database=require('../database/database')
const comic = require('./comic')
const user = require("./user")

const chapterSchema= new mongoose.Schema({
    chapterName: String,
    chapterImageID: [String],
    view: {
        type: Number,
        default: 0},
    dateCreate: {
        type: Date,
        default: Date.now
    },
    uploader: String,
    Report:[{
        users: String,
        reportDate: {
            type: Date,
            default: Date.now
        },
        contents : String
    }]
})
const chapter= new mongoose.model("Chapter", chapterSchema)

async function getOneChapter(idChapter)
{
    const chapterChoose = await chapter.findById(idChapter)
    if(chapterChoose)
    {
        const updateView=chapterChoose.view +1
        await chapter.findOneAndUpdate({_id:idChapter},{view: updateView})
        
    }
    return chapterChoose
}

async function getAllChapter(idComic)
{
    const comicsChoose = await comic.findById(idComic)
    if (comicChoose)
    {
        const chooseComic= comicChoose.chapters
    }
    return chooseComic
}

async function createChapter(chapterName, chapterImage, idMember, idComic)
{
    const member = await user.user.findById(idMember)
    const newChapter=await chapter({chapterName: chapterName, chapterImageID: chapterImage, uploader: member.username})
    await comic.comics.updateOne({_id:idComic}, {"chapters.chapterid":newChapter._id, "chapters.chapterName":newChapter.chapterName})
    
    return true
}
module.exports= {chapter,getOneChapter, getAllChapter};