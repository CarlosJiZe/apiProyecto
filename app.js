require('dotenv').config()
require('./config/passport')
const express = require('express')
const sequelize = require('./config/db')
const routes = require('./routes')
const auth = require('./config/auth')

const app = express()
app.use(express.json())
app.use(auth.optional)
app.use('/',routes)

try{
    sequelize.authenticate();
    sequelize.sync()
    console.log('Connected to DB')
}catch (error){
    console.log('Unable to connect to DB:',error)
}


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server listening on PORT ${process.env.PORT}`)
})

