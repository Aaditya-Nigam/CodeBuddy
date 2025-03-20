const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const { createFile, updateFile, getFile, deleteFile } = require("../controllers/file.controller")
const router=express.Router()

router.post("/create/:id",protectedRoute,createFile)

router.patch("/update/:id",protectedRoute,updateFile)

router.get("/file/:id",protectedRoute,getFile)

router.delete("/delete/:projectId/:id",protectedRoute,deleteFile)

module.exports=router