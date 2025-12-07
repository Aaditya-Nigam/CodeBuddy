const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const { createFile, updateFile, getFile, deleteFile, createCloneFile, getCloneFile } = require("../controllers/file.controller")
const router=express.Router()

router.post("/createFile",protectedRoute,createFile)

router.patch("/update/:id",protectedRoute,updateFile)

router.get("/file/:id/:editable",protectedRoute,getFile)

router.delete("/delete/:projectId/:id",protectedRoute,deleteFile)

router.post("/createCloneFile",protectedRoute,createCloneFile)

router.get("/cloneFile/:fileId/:userId",protectedRoute,getCloneFile)

module.exports=router