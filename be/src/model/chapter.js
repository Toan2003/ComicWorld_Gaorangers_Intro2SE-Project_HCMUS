// const database=require('../database/database')
// const comic = require('./comic')
// const user = require("./user")
const {comics,user,chapter} = require('./schema')


async function getOneChapter(idChapter)
{
    // console.log('@@@@@')
    const chapterChoose = await chapter.findById(idChapter)
    if(chapterChoose)
    {
        const updateView=chapterChoose.view +1
        await chapter.findOneAndUpdate({_id:idChapter},{view: updateView})
        // console.log(comic)
        const newComic = await comics.findOne({"chapters.chaptersID":idChapter})
        // console.log(newComic)

        let newView= newComic.view+1
        await newComic.updateOne({$set:{view:newView}})
    }
    return chapterChoose
}

async function getAllChapter(idComic)
{
    let viewComic=[]
    const comicsChoose = await comics.findById(idComic)
    if (comicsChoose)
    {
        const chooseComic= comicsChoose.chapters
        // console.log(chooseComic)
        for (let i=0; i<chooseComic.length; i++)
        {
            // console.log(chooseComic[i].chaptersID)
            let chapterChoose = await chapter. findOne({_id:chooseComic[i].chaptersID})
            // console.log(chapterChoose)
            viewComic.push(chapterChoose)
        }
        // console.log(viewComic)
    }
    return viewComic
}

async function postCreateChapter(chapterName1, chapterImage, idMember, idComic)
{
    const member = await user.findById(idMember)
    const newChapter=await chapter({chapterName: chapterName1, chapterImageID: chapterImage, uploader: member.username})
    newChapter.save()
    await comics.updateOne({_id:idComic}, {$addToSet:{chapters:[{chaptersID: newChapter._id, chaptersName: chapterName1}]}})
    return true
}
module.exports= {getOneChapter, 
    getAllChapter,
    postCreateChapter
};