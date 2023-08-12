const express =require('express')
const app = express()
const user = require('./model/user')
const port = 3001
const db=require('./database/database')
const cors=require('cors')

// Router
// const home = express.Router()
// const home = require('./teacher.js')
const authorize = require('./route/authorize.js')
// app.use('/',(req,res)   => { console.log('authorize')
// })
app.use(cors());
app.use('/', authorize)
app.listen(port, ()=>console.log(`Example app listening at htttp://localhost:${port}`))