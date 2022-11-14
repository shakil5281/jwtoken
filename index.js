// Internal 
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

// server port
const PORT = process.env.PORT || 8000

// Database connection
mongoose.connect(process.env.URL)
    .then(() =>console.log("Database Connection Success"))
    .catch((err) =>console.log(err))



app.listen(PORT, ()=>{
    console.log(`server start on ${PORT}`)
})