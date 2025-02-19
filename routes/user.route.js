import express from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getProfile/:id", protect, getProfile);
router.put("/editProfile/:id", protect, updateProfile);

export default router;
