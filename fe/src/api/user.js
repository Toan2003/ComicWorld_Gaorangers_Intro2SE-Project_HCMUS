import {axiosClient} from "./axiosConnect"


async function postChangeRole(name, role){
    let link = '/user/changeRole'
    axiosClient.post(link,{name:name,role:role})
}

async function getSearchUser(name) {
    // console.log(name)
    let link = '/user/searchUser/' + name
    // console.log(link)
    // console.log(name)
    // console.log("ffff")
    return axiosClient.get(link)
}

export {
    postChangeRole,
    getSearchUser
}