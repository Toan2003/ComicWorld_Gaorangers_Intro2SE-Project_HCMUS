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
        const member= await user.user.findById(idMember)
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
    //Caanf doij comicURL cover
    async function createComics(comicname, typecomics, status, dateCreate, uploadingroup, uploadid, cover)
    {
        const member= await user.user.findById(uploadid)
        const groupCheck=await group.group.find({groupName:uploadinggroup})
        if(groupCheck)
        {
            const newChapter= new chapter ({nameComics:comicname,type: typecomics, chapterImageID: url, 
                Uploading: {uploader:member.name, group: uploadingroup}, datecreate: dateCreate, coverURL: cover})
            newChapter.save()
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
    
    
    module.exports= {
        comics,
        returnForOneComic,
        returnAllComic,
        returnComments, 
        sortComicBXH, 
        returnFollowingComics, 
        filterType, 
        returnComicsByUploader,
        searchComic
    };
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
    // console.log(typeof(idMember))
    const member= await user.user.findById(idMember)
    
    const comicsFollowing= member.followingcomics
    console.log(comicsFollowing)
    if(comicsFollowing)
    {
        for (comic of comicsFollowing){
            const temp=await comics.findById(comic)
            fullComic.push(temp)
        }
        console.log(fullComic)
    }
     
    return {comicsFollowing, fullComic}
}
//Caanf doij comicURL cover
async function createComics(comicname, typecomics, status, dateCreate, uploadingroup, uploadid, cover)
{
    const member= await user.user.findById(uploadid)
    const groupCheck=await group.group.find({groupName:uploadinggroup})
    if(groupCheck)
    {
        const newChapter= new chapter ({nameComics:comicname,type: typecomics, chapterImageID: url, 
            Uploading: {uploader:member.name, group: uploadingroup}, datecreate: dateCreate, coverURL: cover})
        newChapter.save()
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


module.exports= {
    comics,
    returnForOneComic,
    returnAllComic,
    returnComments, 
    sortComicBXH, 
    returnFollowingComics, 
    filterType, 
    returnComicsByUploader,
    searchComic
};