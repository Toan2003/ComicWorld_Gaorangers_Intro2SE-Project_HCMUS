const mongoose=require('mongoose')

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

const chapter=new mongoose.model ("Chapter", chapterSchema)
module.exports= chapter;