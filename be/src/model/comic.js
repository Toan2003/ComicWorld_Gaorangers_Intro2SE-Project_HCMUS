const mongoose=require('mongoose')
const user=require('./user')
const chapter=require('./chapter')
// const { getComic } = require('../../../fe/src/api/comic')


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

const comics=mongoose.model('Comics', comicSchema)

//Cais nay phai auto co du lieu nha, nen t ko check dau
async function returnAllComic(){
    const allComics= await comics.find()

    return allComics
}

async function sortComicBXH(){
    const sortComic=await comics.find().sort({view:-1})
    return sortComic
}

//Nayf laf search teen nef
async function returnOneComic(idComics){
    const oneComics=await comics.findById({idComics})
    if (oneComics)
    {
        const isSuccess= 'true'
        return {isSucess, oneComics}
    }
    const isSuccess='false'
    return {isSuccess, oneComics}
}



async function returnForHomePage(idMember){
    const allcomics= await comics.find()
    // console.log(allcomics)
    // const view=allcomics[0].view
    const view=[]
    const nameComics=[]
    const idComics=[]
    for (allcomic of allcomics){
        view.push(allcomic.view)
        console.log(allcomic.view)
        nameComics.push(allcomic.nameComics)
        idComics.push(allcomic._id)
    }
    if (idMember)
    {
        const member= await user.findById(idMember)
        const followComics=member.followingcomics
        console.log(followComics)
    }
    else followComics=[]
    return {view, nameComics, idComics}
}
async function returnForOneComic (idMember, idComics)
{
    const oneComics = await comics.findById(idComics)
    const member = await user.user.findById(idMember)
    let followComics = null
    let isFollowed = false
    if (member != null) {
        followComics=member.followingcomics
        if (followComics.includes(idComics))
        {
            isFollowed= true
        }        
    }    
    //Check xem có theo dõi truyện hay ko

    //return tên chap

    const nameChap=[]
    const viewChap=[]
    if (oneComics.chaptersID){
        for (onecomic of oneComics)
        {
            const temp= await chapter.findById(onecomic)
            const nameTemp= temp.chapterName
            const viewTemp=temp.view
            nameChap.push(nameTemp)
            viewChap.push(viewTemp)
        }
    }
    const comments=returnComments(idComics)

    return {oneComics, isFollowed}
}
async function returnComments(idComics)
{
    const oneComics = await comics.findById(idComics)
    const comments= oneComics.Comments
    return {comments}

}
async function returnFollowingComics(idMember)
{
    const fullComic=[]
    const member= await user.findById(idMember)
    const comicsFollowing= member.followingcomics
    if(comicsFollowing)
    {
        for (comic of comicsFollowing){
            const temp=await comics.findById(comic)
            fullComic.push(temp)
        }
    }
    
    return {comicsFollowing, fullComic}
}


module.exports= {comics,returnForOneComic,returnAllComic,returnComments, sortComicBXH, returnFollowingComics};
