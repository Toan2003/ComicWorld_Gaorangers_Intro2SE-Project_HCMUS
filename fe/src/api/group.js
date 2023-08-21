import {axiosClient} from "./axiosConnect"

async function createGroup(nameGroup,description) {
    let link = '/group/createGroup'
    axiosClient.post(link,{nameGroup:nameGroup,description:description })
}

async function addMemberToGroup(nameGroup,nameUploader,) {
    let link = '/group/addMemberToGroup'
    axiosClient.post(link,{nameGroup:nameGroup, nameUploader:nameUploader })
}

export {
    createGroup,
    addMemberToGroup
}