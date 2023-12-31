const {user} = require('./schema');


async function login(username,password) {
    const users = await user.findOne({username})
    
    if (users) {
        if(password==users.password){
            const isSuccess=true,
            type=users.Role
            id =users._id;
            return {isSuccess, type,id}
        }
    } 
    const isSuccess=false,
    type=""
    id = ""
    return {isSuccess, type, id}
}

async function signup(username,password){
    const users=await user.findOne({username})
    if (users)
    {
        const isSuccess=false,
        type=""
        id = ""    
        return {isSuccess,type,id}
    }
    const isSuccess=true
    temp = new user({username,password})
    temp.save()
    type=temp.Role
    id= temp._id
    return {isSuccess,type,id}
}

async function changeMemberRole(name, role)
{
    console.log(role)
    const checkMember = await user.findOne({username: name})
    if (checkMember)
    {
        console.log(checkMember)
        const member = await user.updateOne({username: name}, {$set:{Role: role}})
        
        return true
    }
    return false  
}

async function returnUsername(name)
{
    const checkUser=await user.findOne({username: name})
    // console.log(checkUser)
    return checkUser
    
}
module.exports= { login, signup, 
    changeMemberRole,
    returnUsername};
