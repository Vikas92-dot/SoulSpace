import express from "express";
import { logSession, viewProgress, getAudioCategories, getVideoCategories } from "../controllers/meditation.controller.js";

const router = express.Router();

router.post("/log", logSession);
router.get("/viewProgress/:userId", viewProgress);
router.get("/audio/categories", getAudioCategories);
router.get("/video/categories", getVideoCategories);

export default router;
