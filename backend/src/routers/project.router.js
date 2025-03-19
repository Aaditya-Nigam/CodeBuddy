const express=require("express");
const protectedRoute = require("../middleware/auth.middleware");
const { createProject, joinProject, leaveProject, changeName, deleteProject, getProject } = require("../controllers/project.controller");
const router=express.Router();

router.post("/newProject",protectedRoute,createProject)

router.post("/joinProject/:id",protectedRoute,joinProject)

router.post("/leaveProject/:id",protectedRoute,leaveProject)

router.patch("/update-name",protectedRoute,changeName)

router.delete("/delete/:id",protectedRoute,deleteProject)

router.get("/project/:id",protectedRoute,getProject)

module.exports=router