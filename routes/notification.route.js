import express from "express";
import { setReminder, getReminders, deleteReminder } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/set", setReminder);
router.get("/get", getReminders);
router.delete("/delete/:id",deleteReminder);

export default router;
