const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const {createPushRequest, getPushRequests, deleteRequest, getAllPushRequests, getAllAdminRequests, getRequest, mergePullRequest, mergeConflict} =require("../controllers/pushRequest.controller")
const router=express.Router()

router.post("/createPushRequest",protectedRoute,createPushRequest)

router.get("/getPushRequests/:fileId",protectedRoute,getPushRequests)

router.delete("/deleteRequest/:requestId",protectedRoute,deleteRequest)

router.get("/getAllPushRequests/:projectId",protectedRoute,getAllPushRequests)

router.get("/getAllAdminRequests/:projectId",protectedRoute,getAllAdminRequests)

router.get("/getRequest/:requestId",protectedRoute,getRequest)

router.post("/mergePullRequest/:requestId",protectedRoute,mergePullRequest)

router.post("/mergeConflict/:requestId",protectedRoute,mergeConflict)

module.exports=router