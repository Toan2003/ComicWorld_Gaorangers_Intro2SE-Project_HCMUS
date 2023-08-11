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

module.exports= user;