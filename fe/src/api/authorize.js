import axiosClient from "./axiosConnect";


async function getLogin(data) {
    console.log(data);
    return await axiosClient.post('/authorize/login', data);
}

async function getSignup(data) {
    return await axiosClient.post('/authorize/signup', data);
}

export {getLogin,getSignup};