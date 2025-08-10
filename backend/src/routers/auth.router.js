const express=require("express");
const { authSignUp, authSignIn, authLogout, authUpdateSkills, authCheck, changeProfile } = require("../controllers/auth.controller");
const protectedRoute = require("../middleware/auth.middleware");
const router=express.Router();

router.post("/signUp",authSignUp)

router.post("/signIn",authSignIn)

router.post("/logout",authLogout)

router.post("/update-skills",protectedRoute,authUpdateSkills)

router.get("/check",protectedRoute,authCheck)

router.post("/changeProfile",protectedRoute,changeProfile)

module.exports=router
