import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, verifyOtp ,uploadProfilePicture, forgotPassword,forgotOtp} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { body } from "express-validator";
import upload from "../middleware/UploadMiddleware.js";

const router = express.Router();

router.post("/register",
    body("email","Invalid email id").isEmail(),
    body("email","Email is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    body("password","Password length should be 6 to 10").isLength({min:6,max:10}),registerUser);


router.post("/login", loginUser);
router.post('/verify-otp', verifyOtp);
router.get("/getProfile/:id", protect, getProfile);
router.put('/forgotOtp',forgotOtp);
router.put('/forgotPassword',forgotPassword);
router.put("/editProfile/:id", protect, updateProfile);
router.post("/upload/:id",upload.single("image"),uploadProfilePicture);


export default router;
