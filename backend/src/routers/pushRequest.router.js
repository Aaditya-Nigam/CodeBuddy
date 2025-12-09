const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const {createPushRequest} =require("../controllers/pushRequest.controller")
const router=express.Router()

router.post("/createPushRequest",protectedRoute,createPushRequest)

module.exports=router