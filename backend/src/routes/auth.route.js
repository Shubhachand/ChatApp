import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {signup,login,logout,onboard} from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login)
router.post("/logout",logout);

// forget - password
// email notifcation


// onboarding only after auth
router.post("/onboarding",protectRoute,onboard)

// this is a protected route
// it will only be accessible if the user is authenticated  
//  so this is for frontend to check if the user is logged in or not
// if the user is logged in, it will return the user data
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    message: "This is a protected route",
    user: req.user,
  });
});
export default router;