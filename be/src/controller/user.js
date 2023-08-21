const database = require('../model/user')


async function postChangeRole(req,res) {
    const {name, role} = req.body
    if (name == null || name == '') {
        return res.json({
            isSuccess: false,
            message: 'id is required',
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
    let result = database.changeMemberRole(name, role)
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
    const {name} = req.query
    if (name == null || name == '') {
        return res.json({
            isSuccess: false,
            message: 'username is required',
            status: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    postChangeRole
}