const database = require('../model/user')

async function postSignup(req, res) {
    let {email, password} = req.body
    if (!email || !password) {
        return res.json({
            isSuccess: false,
            message: 'Email or password are missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.signup(email, password)
    if (result.isSuccess) {
        return res.json({
            isSuccess: true,
            message: 'Account created successfully',
            status: res.statusCode,
            data: {
                type: result.type,
                id: result.id
            }
        })
    } else {
        return res.json({
            isSuccess: true,
            message: 'The username have already registered',
            status: res.statusCode,
            data: ''
        })
    }
}

async function getLogin(req, res) {
    console.log(req.body)
    let {email, password} = req.body

    if (!email || !password) {
        return res.json({
            isSuccess: false,
            message: 'Email or password are missing',
            status: res.statusCode,
            data: ''
        })
    }
    let result = await database.login(email, password)
    if (result.isSuccess) {
        return res.json({
            isSuccess: result.isSuccess,
            message: 'Login successfully',
            status: res.statusCode,
            data: {
                type: result.type,
                id: result.id
            }
        })
    } else {
        return res.json({
            isSuccess: result.isSuccess,
            message: 'The email or password is incorrect',
            status: res.statusCode,
            data: ''
        })
    }
}

module.exports = {
    postSignup,
    getLogin
}