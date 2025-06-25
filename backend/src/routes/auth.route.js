import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {signup,login,logout,onboard} from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login)
router.post("/logout",logout);


// onboarding only after auth
router.post("/onboarding",protectRoute,onboard)
export default router;

router.get("/protected", protectRoute, (req, res) => {
  res.status(200).json({
    message: "This is a protected route",
    user: req.user,
  });
});