const mongoose=require('mongoose')
const user=require('./user')
const chapter=require('./chapter')
const group=require('./group')
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
        const member= await user.user.findById(idMember)
        const followComics=member.followingcomics
        console.log(followComics)
    }
    else followComics=[]
    return {view, nameComics, idComics}
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
    // console.log(typeof(idMember))
    const member= await user.user.findById(idMember)
    
    const comicsFollowing= member.followingcomics
    // console.log(comicsFollowing)
    if(comicsFollowing)
    {
        for (comic of comicsFollowing){
            const temp=await comics.findById(comic)
            fullComic.push(temp)
        }
        // console.log(fullComic)
    }
     
    return {comicsFollowing, fullComic}
}

//Caanf doij comicURL cover
async function createComics(comicname, typecomics, status1, dateCreate, uploadinggroup, uploadid, cover)
{
    const member= await user.user.findById(uploadid)
    // console.log(member)
    const groupCheck=await group.group.find({groupName:uploadinggroup})
    if(groupCheck)
    {
        const newComic= new comics ({nameComics:comicname,type: typecomics, status: status1,
            Uploading: {uploader:member.username, group: uploadinggroup}, datecreate: dateCreate, coverURL: cover})
        newComic.save()
        const isSuccess=true
        return {isSuccess}
    }
    const isSuccess=false
    return {isSuccess}
}

async function filterType(typename)
{
    const findComics= await comics.find({type:typename})
    return findComics
}

async function returnComicsByUploader(iduploader)
{
    const nameMember= await user.user.findById(iduploader)
    if(nameMember){
        const groupMember = await group.group.findOne({Uploader:nameMember.username})
        if(groupMember){
            const comicUpload= await comics.find({"Uploading.group":groupMember.groupName})
            return comicUpload
        }
    }
    return []
} 

async function searchComic(name)
{
    const mySentence = name
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    name=words.join(" ");
    const searchingComic = await comics.find({nameComics:{$regex: name}})
    return searchingComic
}

async function followOneComic(idComic, idMember)
{
    const comicFollow = await comics.findById(idComic)
    if(idComic)
    {
        const member= await user.user.findById(idMember)
        if (member)
        {
            await member.updateOne({$addToSet: {followingcomics: idComic}})
            return true
        }
    }
    return false
}

async function unfollowOneComic(idComic, idMember)
{
    const comicFollow = await comics.findById(idComic)
    if(idComic)
    {
        const member= await user.user.findById(idMember)
        if(member)
        {
            await member.updateOne({$pull:{followingcomics: idComic}})
            return true
        }
    }
    return false
}

async function returnForOneComic (idMember, idComics)
{
    // console.log(idComics)
    const oneComics = await comics.findById(idComics)
    const member = await user.user.findById(idMember)
    let followComics = null
    let isFollowed = false
    // console.log(member)
    if (member != null) {
        followComics=member.followingcomics
        // console.log(followComics)
        if (followComics.includes(idComics))
        {
            // console.log("ffffff")
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

async function newComment(idComic, idMember, des )
{
    const newComic = await comics. findById(idComic)
    if(newComic)
    {
        const newMember = await user.user.findById(idMember)
        if(newMember)
        {

            await newComic.updateOne({$addToSet:{Comments:{content: des, username: newMember.username }}})
            return true
        }
    }
    return false
}

async function isRating(idComic, idMember)
{
    const newMember = await user.user.findById(idMember)
    if(newMember){
        const newComic = await comics.findOne({_id: idComic, Rating:{username: idMember.username}})
        if(newComic)
        {
            const star= newComic.Rating.star
            const isRating= true
            return {star, isRating}
        }
    }
    const star=-1
    const isRating=false
    return {star, isRating}
}

async function ratingComic(idComic, idMember, starNum)
{
    const newComic = await comics.findById(idComic)
    const newMember = await user.user.findById(isMember)
    const avg=0
    if(newComic)
    {
        if(newMember)
        {
            await newComic.updateOne({$addToSet:{star: starNum, username: newMember.username }})
            for (let i=0; i<newComic.Rating.length; i++)
            {
                avg+=newComic.Rating.star
            }
            avg=avg/newComic.Rating.length
            await newComic.updateOne({$set:{ratingAvg: avg}})
            return true
        }
    }
    return false
}
module.exports= {
    comics,
    returnForOneComic,
    returnAllComic,
    returnComments, 
    sortComicBXH, 
    returnFollowingComics, 
    filterType, 
    returnComicsByUploader,
    searchComic,
    followOneComic,
    unfollowOneComic,
    createComics,
    newComment,
    isRating, 
    ratingComic
};
