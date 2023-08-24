const {comics,user,chapter,group} = require('./schema')
// const user=require('./user')
// const chapter=require('./chapter')
// const group=require('./group')
// const { getComic } = require('../../../fe/src/api/comic')



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
        // console.log(allcomic.view)
        nameComics.push(allcomic.nameComics)
        idComics.push(allcomic._id)
    }
    if (idMember)
    {
        const member= await user.findById(idMember)
        const followComics=member.followingcomics
        // console.log(followComics)
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
    const member= await user.findById(idMember)
    
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
    const member= await user.findById(uploadid)
    // console.log(member)
    const groupCheck=await group.find({groupName:uploadinggroup})
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
    const nameMember= await user.findById(iduploader)
    if(nameMember){
        const groupMember = await group.findOne({Uploader:nameMember.username})
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
        const member= await user.findById(idMember)
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
        const member= await user.findById(idMember)
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
    const member = await user.findById(idMember)
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
    // const comments=returnComments(idComics)

    return {oneComics, isFollowed}
}

async function newComment(idComic, idMember, des )
{
    const newComic = await comics. findById(idComic)
    if(newComic)
    {
        const newMember = await user.findById(idMember)
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
    let star=-1
    const newMember = await user.findById(idMember)
    if(newMember){
        const newComic = await comics.findOne({_id: idComic,"Rating.username": newMember.username })
        // console.log(newComic)
        if(newComic)
        {
            
            // const star= newComic.Rating.star
            for (let i=0; i<newComic.Rating.length; i++)
            {
                if (newMember.username == newComic.Rating[i].username)
                {   
                    star=newComic.Rating[i].star
                    break
                }
            }
            const isRating= true

            return {star, isRating}
        }
    }
    star=-1
    const isRating=false
    return {star, isRating}
}

async function ratingComic(idComic, idMember, starNum)
{
    const newComic = await comics.findById(idComic)
    const newMember = await user.findById(idMember)
    let avg=0
    // console.log(typeof(starNum))
    if(newComic)
    {
        if(newMember)
        {
            await newComic.updateOne({$addToSet:{Rating:{star: starNum, username: newMember.username}}})
            const reallynewComic = await comics.findById(idComic)
            for (let i=0; i<reallynewComic.Rating.length; i++)
            {
                // console.log(typeof(reallynewComic.Rating[i].star))
                avg+=reallynewComic.Rating[i].star
                // console.log(typeof(avg))
                // console.log(avg)
            }
            // console.log(newComic.Rating.length)
            length=reallynewComic.Rating.length
            // console.log(typeof(length))
            avg=Math.round(avg/length*10)/10
            // console.log(typeof(avg))
            // console.log(avg)
            await reallynewComic.updateOne({$set:{ratingAvg: avg}})
            return true
        }
    }
    return false
}



module.exports= {
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
