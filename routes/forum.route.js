import express from "express";
import { createPost, commentPost, likePost, reportPost, bookmarkPost } from "../controllers/forum.controller.js";

const router = express.Router();

router.post("/createPost", createPost);
router.post("/comment", commentPost);
router.post("/like", likePost);
router.post("/report", reportPost);
router.post("/bookmark", bookmarkPost);

export default router;
