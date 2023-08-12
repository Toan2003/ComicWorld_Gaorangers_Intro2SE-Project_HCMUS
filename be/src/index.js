const express =require('express')
const app = express()
const user = require('./model/user')
const port = 8080
const db = require('./database/database')
const cors = require('cors')
app.use(cors())
// Router
// const home = express.Router()
// const home = require('./teacher.js')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authorize = require('./route/authorize')
app.use('/authorize', authorize)
// app.use('/',(req,res)   => { console.log('authorize')
// })

app.listen(port, ()=>console.log(`Example app listening at htttp://localhost:${port}`))