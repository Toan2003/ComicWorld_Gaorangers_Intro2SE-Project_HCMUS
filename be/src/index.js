const express =require('express')
const app = express()
const user = require('./model/user')
const port = 3001

// Router
// const home = express.Router()
// const home = require('./teacher.js')
const authorize = require('./route/authorize.js')
app.use('/',(req,res)   => { console.log('authorize')
})
app.use('/authorize', authorize)
app.listen(port, ()=>console.log(`Example app listening at htttp://localhost:${port}`))