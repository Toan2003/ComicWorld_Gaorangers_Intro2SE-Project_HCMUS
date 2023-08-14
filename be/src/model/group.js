const mongoose = require('mongoose');

const groupSchema= new mongoose.Schema ({
    groupName: String,
    Description: String,
    Uploader: [String]
})
const group = mongoose.model('Group', groupSchema)

module.exports= group;