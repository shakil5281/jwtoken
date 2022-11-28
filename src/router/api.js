const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')
const userDataController = require('../controller/userDataController')
const crudController = require('../controller/crudController')
const AuthVeryfy = require('../middleware/Authvery')


// router setup
// get Router
router.get('/', AuthVeryfy, userDataController.home)



// Curd Router 
router.get('/read',AuthVeryfy, crudController.Readdata)
router.post('/create',AuthVeryfy, crudController.Create)

router.post('/update/:id',AuthVeryfy, crudController.Updatedata)
router.get('/delete/:id',AuthVeryfy, crudController.Deletadata)

// active status
router.get('/crud/status/:status',AuthVeryfy, crudController.status)
router.get('/crud/ReadDate',AuthVeryfy, crudController.ReadDate)



// Post Router 
router.post('/signup', userController.register)
router.post('/signin', userController.login)
router.post('/update',AuthVeryfy, userController.passwordUpdate)
router.post('/profile',AuthVeryfy, userController.profileupdate)






module.exports = router;