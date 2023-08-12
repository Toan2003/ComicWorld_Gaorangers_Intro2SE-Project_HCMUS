const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    Role:{
        type: String,
        default: "member"
    },
    followingcomics: Number
})

const user = mongoose.model('User', userSchema);


async function login(username,password) {
    const users = await user.findOne({username})
    
    if (users) {
        if(password==users.password){
            const isSuccess='true',
            type=users.Role
            return {isSuccess, type}
        }
    } 
    const isSuccess='false',
    type=""
    return {isSuccess, type}
}

async function signup(username,password){
    const users=await user.findOne({username})
    if (users)
    {
        const isSuccess='false',
        type=""    
        return {isSuccess,type}
    }
    const isSuccess="true"
    temp= new user({username,password})
    temp.save()
    type=temp.Role
    return {isSuccess,type}
}
module.exports= {user, login, signup};