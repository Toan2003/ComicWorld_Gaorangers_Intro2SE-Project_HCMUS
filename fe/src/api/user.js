import {axiosClient} from "./axiosConnect"


async function postChangeRole(name, role){
    let link = '/user/changeRole'
    axiosClient.post(link,{name:name,role:role})
}

async function getSearchUser(name) {
    let link = '/user/searchUser/' + name
    return axiosClient.get(link)
}

export {
    postChangeRole,
    getSearchUser
}