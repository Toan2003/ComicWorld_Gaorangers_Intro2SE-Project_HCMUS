import axiosClient from "./axiosConnect";


async function getLogin(data) {
    return await axiosClient.get('authorize/login', {data});
}

async function getSignup(data) {
    return await axiosClient.post('authorize/signup', data);
}

export {getLogin,getSignup};