const mongoose=require('mongoose')
const database=require('../database/database')


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

module.exports= {chapter,getOneChapter};