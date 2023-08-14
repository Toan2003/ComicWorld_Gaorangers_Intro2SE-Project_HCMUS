const database = require('../model/user')

async function postSignup(req, res) {
    let {email, password} = req.body
    if (!email || !password) {
        return res.json({
            isSuccess: false,
            message: 'Email or password are missing',
            status: res.statusCode
        })
    }
    let result = await database.signup(req.params)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'Account created successfully',
            status: res.statusCode
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'The email have already registered',
            status: res.statusCode
        })
    }
}

async function getLogin(req, res) {
    console.log(req.body)
    let {email, password} = req.body
    console.log({email, password})
    if (!email || !password) {
        return res.json({
            isSuccess: false,
            message: 'Email or password are missing',
            status: res.statusCode,
            type: ''
        })
    }
    let result = await database.login(email, password)
    if (result) {
        return res.json({
            isSuccess: true,
            message: 'Account created successfully',
            status: res.statusCode,
        })
    } else {
        return res.json({
            isSuccess: false,
            message: 'The email have already registered',
            status: res.statusCode,
            type: ''
        })
    }
}
module.exports = {
    postSignup,
    getLogin
}