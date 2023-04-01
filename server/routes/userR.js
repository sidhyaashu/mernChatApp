const express = require('express')
const router = express.Router()
const userController = require('../controllers/userC.js')


router.route('/').post(userController.register)
router.post('/login',userController.login)



module.exports = router