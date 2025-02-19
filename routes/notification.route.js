import express from "express";
import { setReminder, getReminders } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/set", setReminder);
router.get("/get", getReminders);

export default router;
