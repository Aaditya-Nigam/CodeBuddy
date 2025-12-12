const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const {createPushRequest, getPushRequests, deleteRequest, getAllPushRequests} =require("../controllers/pushRequest.controller")
const router=express.Router()

router.post("/createPushRequest",protectedRoute,createPushRequest)

router.get("/getPushRequests/:fileId",protectedRoute,getPushRequests)

router.delete("/deleteRequest/:requestId",protectedRoute,deleteRequest)

router.get("/getAllPushRequests/:projectId",protectedRoute,getAllPushRequests)

module.exports=router