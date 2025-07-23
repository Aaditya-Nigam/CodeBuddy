const express=require("express");
const protectedRoute = require("../middleware/auth.middleware");
const { getFolders } = require("../controllers/folder.controller");
const router=express.Router();

router.get("/getFolder/:projectId/:folderId", protectedRoute, getFolders)

router.post("/createFolder", protectedRoute, createFolder)

module.exports=router