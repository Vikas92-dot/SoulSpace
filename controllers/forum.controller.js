// forumController.js
import ForumPost from '../models/forum.model.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = new ForumPost({ title, content, userId });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', newPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Comment on a post
export const commentPost = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;
        const post = await ForumPost.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.comments.push({ userId, comment });
        await post.save();
        res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Like a post
export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        
        
        console.log("Request body:", req.body);
        
        const post = await ForumPost.findById(postId);
        if (!post) {
            console.log("Post not found:", postId);
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!Array.isArray(post.likes)) {
            post.likes = []; // Ensure likes is an array
        }

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
        }
        
        await post.save();
        res.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        console.error("Error in likePost:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Report a post
export const reportPost = async (req, res) => {
    try {
        const { postId, userId, reason } = req.body;
        const post = await ForumPost.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.reports.push({ userId, reason });
        await post.save();
        res.status(200).json({ message: 'Post reported successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Bookmark a post
export const bookmarkPost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const post = await ForumPost.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (!post.bookmarks.includes(userId)) {
            post.bookmarks.push(userId);
        }
        await post.save();
        res.status(200).json({ message: 'Post bookmarked successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
