const express =require('express')
const app = express()
// const user = require('./model/user')
const port = 8080
const db = require('./database/database')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ 
    extended: true, 
    limit: "50mb",
}));
app.use(express.json());

const authorize = require('./route/authorize')
const comic = require('./route/comic')
const user = require('./route/user')
const chapter = require('./route/chapter')

app.use(authorize)
app.use(comic)
app.use(user)
app.use(chapter)

app.listen(port, ()=>console.log(`Example app listening at htttp://localhost:${port}`))