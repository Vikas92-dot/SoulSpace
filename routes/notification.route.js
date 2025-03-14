import express from "express";
import { setNotification, getUserNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/set", setNotification);
router.get("/get/:userId", getUserNotifications);


export default router;
