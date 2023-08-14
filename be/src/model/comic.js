const mongoose=require('mongoose')
const user=require('./user')
const chapter=require('./chapter')

const comicSchema = new mongoose.Schema({
    nameComics: String,
    type: String,
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
    chaptersID:[{
        // type: mongoose.Schema.Types.ObjectId, ref: 'chapter'
        type: String
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
    const member = await user.findById(idMember)
    const followComics=member.followingcomics
    
    //Check xem có theo dõi truyện hay ko
    if (followComics.includes(idComics))
    {
        const isFollowed="true"
    }
    const isFollowed="false"
    
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
module.exports= comics;
