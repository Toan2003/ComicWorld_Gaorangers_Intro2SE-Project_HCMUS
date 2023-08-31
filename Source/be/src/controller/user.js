const database = require('../model/user')


async function postChangeRole(req,res) {
    const {name, role} = req.body
    if (name == null || name == '') {
        return res.json({
            isSuccess: false,
            message: 'name is required',
            status: res.statusCode,
            data: ''
        })
    }
    if (role == null || role == '') {
        return res.json({
            isSuccess: false,
            message: 'role is required',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.changeMemberRole(name, role).catch(err => {
        console.log(err)
        return res.json({
            isSuccess: false,
            message: 're',
            status: res.statusCode,
            data: ''
        })
    })
    if (result) {
        return res.json({
            isSuccess: true,
            message:'role has changed',
            status: res.statusCode,
            data: ''
        })
    } else {
        return res.json({
            isSuccess: false,
            message:'role has not changed',
            status: res.statusCode,
            data: ''
        })
    }
}

async function getSearchUser(req, res) {
    const {name} = req.params
    // console.log(name)
    if (name == null || name == '') {
        return res.json({
            isSuccess: false,
            message: 'username is required',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.returnUsername(name)
    // console.log(result)
    // console.log('aaaa')
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'username found',
            status: res.statusCode,
            data: { 
                user: result
            }
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'username not found',
            status: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    postChangeRole,
    getSearchUser
}