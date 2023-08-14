import axiosClient from "./axiosConnect";

// {
//     'isSuccess': false/true
//     'message': 'notification',
//     'status': res.statusCode,
//     'type': 'accountType' (member/uploader/admin)
// }

async function getLogin(data) {
    console.log(data);
    return await axiosClient.post('/authorize/login', data);
}

async function postSignup(data) {
    return await axiosClient.post('/authorize/signup', data);
}

export {getLogin,postSignup};