const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const { createFile, updateFile, getFile, deleteFile, createCloneFile, getCloneFile, updateCloneFile, syncFile } = require("../controllers/file.controller")
const router=express.Router()

router.post("/createFile",protectedRoute,createFile)

router.patch("/update/:id",protectedRoute,updateFile)

router.get("/file/:id/:editable",protectedRoute,getFile)

router.delete("/delete/:projectId/:id",protectedRoute,deleteFile)

router.post("/createCloneFile",protectedRoute,createCloneFile)

router.get("/cloneFile/:fileId",protectedRoute,getCloneFile)

router.patch("/cloneFile/update/:id",protectedRoute,updateCloneFile)

router.post("/cloneFile/sync/:id/:cloneId",protectedRoute,syncFile)

module.exports=router