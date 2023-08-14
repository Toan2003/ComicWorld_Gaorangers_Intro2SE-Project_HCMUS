const database = require('../model/user')

async function postSignup(req, res) {
    let {email, password} = req.body
    if (!email || !password) {
        return res.json({
            'isSuccess': false,
            'message': 'Email or password are missing',
            'status': res.statusCode,
            'type': ''
        })
    }
    let result = await database.signup(email, password)
    let {isSuccess,type} = result
    if (isSuccess) {
        return res.json({
            'isSuccess': isSuccess,
            'message': 'Account created successfully',
            'status': res.statusCode,
            'type': type
        })
    } else {
        return res.json({
            'isSuccess': isSuccess,
            'message': 'The username have already registered',
            'status': res.statusCode,
            'type': type
        })
    }
}

async function getLogin(req, res) {
    console.log(req.body)
    let {email, password} = req.body
    if (!email || !password) {
        return res.json({
            'isSuccess': false,
            'message': 'Email or password are missing',
            'status': res.statusCode,
            'type': ''
        })
    }
    let result = await database.login(email, password)
    let {isSuccess,type } = result
    if (isSuccess) {
        return res.json({
            'isSuccess': isSuccess,
            'message': 'Login successfully',
            'status': res.statusCode,
            'type': type
        })
    } else {
        return res.json({
            'isSuccess': isSuccess,
            'message': 'The email or password is incorrect',
            'status': res.statusCode,
            'type': type
        })
    }
}

module.exports = {
    postSignup,
    getLogin
}