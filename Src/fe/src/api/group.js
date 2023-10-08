import {axiosClient} from "./axiosConnect"

async function createGroup(nameGroup,description) {
    let link = '/group/createGroup'
    return axiosClient.post(link,{nameGroup:nameGroup,description:description })
}

async function addMemberToGroup(nameGroup,nameUploader) {
    let link = '/group/addMemberToGroup'
    return axiosClient.post(link,{nameGroup:nameGroup, nameUploader:nameUploader })
}


async function returnGroup() {
    let link = '/group/returnGroup'
    return axiosClient.get(link)
}

export {
    createGroup,
    addMemberToGroup,
    returnGroup
}