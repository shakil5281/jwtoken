const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
try{

    const token = req.cookies.jwtoken
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const {username} = decoded
    req.username= username

    next()
    }
     catch(err) {
        next("Authentication failure!");
    }
};

module.exports = checkLogin;