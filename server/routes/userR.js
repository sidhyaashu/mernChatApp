const express = require('express')
const router = express.Router()
const userController = require('../controllers/userC.js')
const { protect } = require('../middleware/authMiddleware.js')



router.route('/').post(userController.register)
                .get(protect,userController.allUsers)
router.post('/login',userController.login)



module.exports = router