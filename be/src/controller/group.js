const database = require('../model/group')


async function createGroup(req,res) {
    let {nameGroup,description} =req.body
    if (nameGroup == null || nameGroup.length == 0) {
        return res.json({
            isSuccess: false,
            message: 'name group is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.createGroup(nameGroup, description).catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message: 'create group fail beacause of database',
            status: res.statusCode,
            data: ''
        })
    })
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'create group success',
            status: res.statusCode,
            data: result
    })
    } else {
        return res.json({
            isSuccess: false,
            message: 'create group fail',
            status: res.statusCode,
            data: ''
        })
    }
}

async function addMemberToGroup(req,res) {
    let {nameUploader, nameGroup} =req.body
    if (nameUploader == null || nameGroup == null ) {
        return res.json({
            isSuccess: false,
            message: 'name group or name uploader is missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.addMemberToGroup(nameUploader, nameGroup).catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message: 'add member to group fail beacause of database',
            status: res.statusCode,
            data: ''
        })
    })
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'add member to group success',
            status: res.statusCode,
            data: ''
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'add member to group fail',
            status: res.statusCode,
            data: ''
        })
    }

}

async function returnGroup(req, res) {
    let result = await database.returnGroup() .catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message: 'add member to group fai because of database',
            status: res.statusCode,
            data: ''
        })

    })
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'return group success',
            status: res.statusCode,
            data: ''
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'return group fail',
            status: res.statusCode,
            data: {
                group: result
            }
        })
    }
}


module.exports = {
    createGroup,
    addMemberToGroup,
    returnGroup
}