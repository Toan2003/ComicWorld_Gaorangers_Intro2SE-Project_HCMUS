const {group,user} = require('./schema');

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
        const isInGroup = await group.findOne({ Uploader: [nameUploader]})
        // console.log(isInGroup)
        if (!isInGroup)
        {
            const checkMember = await user.findOne({username: nameUploader,$or:[{Role:"uploader" }, {Role:"admin"}]})
            if(checkMember)
            {  
                const newMemberGroup = await group.updateOne({groupName: nameGroup}, {$addToSet:{Uploader:[nameUploader]}})
                return true
            } 
        }
    }
    return false
}

async function returnGroup()
{
    const checkGroup = await group.find()
    return checkGroup
}



module.exports= {createGroup, addMemberToGroup, returnGroup};