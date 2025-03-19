const express=require("express");
const { authSignUp, authSignIn, authLogout, authUpdateSkills } = require("../controllers/auth.controller");
const protectedRoute = require("../middleware/auth.middleware");
const router=express.Router();

router.post("/signUp",authSignUp)

router.post("/signIn",authSignIn)

router.post("/logout",authLogout)

router.post("/update-skills",protectedRoute,authUpdateSkills)

module.exports=router
