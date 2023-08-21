const mongoose=require('mongoose')

const comicSchema = new mongoose.Schema({
    nameComics: String,
    type: String, //the loai 
    status: String, 
    coverURL: String,
    view: {
        type: Number,
        default: 0},
    datecreate: Date,
    ratingAvg: {
        type: Number,
        default: 0},
    Uploading: {
            group: String,
            // uploader:{type: mongoose.Schema.Types.ObjectId, ref: 'user'}
            uploader: String 
    },
    chapters:[
    {
        chapterid:
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'chapter'
        },
        chapterName: String
    }],
    Comments:[{
        content: String,
        username: String,
        dateComment: {
            type:Date,
            default: Date.now
        }
    }],
    Rating:[{
        star: Number,
        username: String,
        dateRating:{
            type:Date,
            default: Date.now
        }
    }]
})

const comics = mongoose.model('Comics', comicSchema)
// ----------------------------------------------------------------
const groupSchema= new mongoose.Schema ({
    groupName: String,
    Description: String,
    Uploader: [String]
})
const group = mongoose.model('Group', groupSchema)

// ----------------------------------------------------------------
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    Role:{
        type: String,
        default: "member"
    },
    followingcomics: [{type: mongoose.Schema.Types.ObjectId, ref:"comic"}]
})

const user = mongoose.model('User', userSchema);

// ----------------------------------------------------------------
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
const chapter = new mongoose.model("Chapter", chapterSchema)

module.exports = {
    comics,
    group,
    user,
    chapter
}
