const express = require("express")
const Chat = require('../models/chatM.js')
const { protect } = require("../middleware/authMiddleware.js")
const router = express.Router()
const chatControllers = require('../controllers/chatC.js')



router.route('/').post(protect,chatControllers.accessChat) 
router.route('/').get(protect,chatControllers.fetchChats)  
router.route('/group').post(protect,chatControllers.createGroupChat)  
router.route('/rename').put(protect,chatControllers.renameGroup)  
router.route('/groupremove').put(protect,chatControllers.removeFromGroup)  
router.route('/groupadd').put(protect,chatControllers.addToGroup)  

module.exports = router