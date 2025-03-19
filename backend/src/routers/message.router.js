const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const { sendMessage, getMessages } = require("../controllers/message.controller")
const router=express.Router()

router.post("/sendMessage/:id",protectedRoute,sendMessage)

router.get("/getMessages/:id",protectedRoute,getMessages)

module.exports=router