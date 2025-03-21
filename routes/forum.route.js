import express from "express";
import { createPost, commentPost, likePost,getPostDetails, getAllPosts } from "../controllers/forum.controller.js";

const router = express.Router();

router.post("/createPost", createPost);
router.post("/comment", commentPost);
router.post("/like", likePost);
router.get('/:postId/details',getPostDetails); //It defines that we want all information of post ex likes,comments and userInteraction
router.get('/AllPosts', getAllPosts);



export default router;
