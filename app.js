// Internal Require
const express = require('express');
const router = require('./src/router/api');
const app = express()


// Internal Require
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookie = require('cookie-parser')


// BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Sequrity parpas used
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cookie());


// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Router use
app.use(router)


// errror hendler
const errHendler = (err, req, res, next) =>{
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({ error: err})
}

app.use(errHendler)




// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})



module.exports = app;