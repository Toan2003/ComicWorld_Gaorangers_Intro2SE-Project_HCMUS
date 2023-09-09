import axios from "axios"
// import {v2 as cloudinary} from "cloudinary"
// import {Cloudinary} from "@cloudinary/url-gen";

// const cloud = new Cloudinary({cloud: { 
//     cloud_name: 'comicimage',
//     api_key: '648687645831283', 
//     api_secret: 'JC3Pf5ilCtzv0bJj4TV00pwH4cI'  
// }});


// cloudinary.config({ 
//     cloud_name: 'comicimage', 
//     api_key: '648687645831283', 
//     api_secret: 'JC3Pf5ilCtzv0bJj4TV00pwH4cI' 
// });
// link back-end: 'localhost::3000'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
})

export {axiosClient};
