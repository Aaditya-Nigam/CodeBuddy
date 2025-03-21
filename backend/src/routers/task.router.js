const express=require("express")
const protectedRoute = require("../middleware/auth.middleware")
const { createTask, updateTask, getTask, deleteTask } = require("../controllers/task.controller")
const router=express.Router()

router.post("/newtask/:id",protectedRoute,createTask)

router.patch("/update/:id",protectedRoute,updateTask)

router.get("/task/:id",protectedRoute,getTask)

router.delete("/task/:projectId/:id",protectedRoute,deleteTask)


module.exports=router