const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')
const userDataController = require('../controller/userDataController')
const AuthVeryfy = require('../middleware/Authvery')


// router setup
// get Router
router.get('/', AuthVeryfy, userDataController.home)





// Post Router
router.post('/signup', userController.register)
router.post('/signin', userController.login)
router.post('/update',AuthVeryfy, userController.passwordUpdate)






module.exports = router;