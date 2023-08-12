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
        return true;
    } else {
        return false;
    }
}
module.exports= user;