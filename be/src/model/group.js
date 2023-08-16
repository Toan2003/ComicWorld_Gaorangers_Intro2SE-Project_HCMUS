const mongoose = require('mongoose');
const user = require('./user')
const groupSchema= new mongoose.Schema ({
    groupName: String,
    Description: String,
    Uploader: [String]
})
const group = mongoose.model('Group', groupSchema)

async function createGroup(name, description)
{
    // const checkUploader= await user.findOne({username:uploader})
    const newGroup= new group({groupName: name, Description: description})
    newGroup.save()
    return true
}

async function addMemberToGroup(nameUploader, nameGroup)
{
    const checkGroup = await group.findOne({groupName: nameGroup})
    if(checkGroup)
    {   
        const checkMember = await user.findOne({username: nameUploader, Role:"uploader"})
        if(checkMember)
        {  
            const newMemberGroup = await group.updateOne({groupName: nameGroup}, {$addToSet:{Uploader:[nameUploader]}})
            return true
        }
    }
    return false
}

module.exports= {group, createGroup, addMemberToGroup};