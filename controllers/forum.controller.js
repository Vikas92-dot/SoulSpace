import ForumPost from "../models/forum.model.js";
import Like from "../models/forumLikes.js";
import User from "../models/user.model.js";
import ForumPostComments from "../models/forumPostComments.model.js";
import { Op } from "sequelize";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    
    // Ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = await ForumPost.create({ title, content, userId });

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment on a post

export const commentPost = async (req, res) => {
  console.log(req.body);
  
  try {
    const { id, userId, commentText } = req.body;

    // Check if post exists
    const post = await ForumPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create the comment
    const forumPostId = id;
    const newComment = await ForumPostComments.create({ forumPostId, userId, commentText });

    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const { forumPostId, userId } = req.body;

    const post = await ForumPost.findByPk(forumPostId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const existingLike = await Like.findOne({ where: { forumPostId, userId } });

    if (!existingLike) {
      await Like.create({ forumPostId, userId });
      return res.status(200).json({ message: "Post liked successfully" });
    }

    res.status(400).json({ message: "User already liked this post" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Post details
export const getPostDetails = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);

    const post = await ForumPost.findByPk(postId, {
      include: [
        {
          model: ForumPostComments,
          as: "comments",
          attributes: ["id", "commentText"],
          include: [
            {
              model: User,
              as: "user", // Correct alias for user
              attributes: ["id", "name"], // Fetch user who commented
            },
          ],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id"],
          include: [
            {
              model: User,
              as: "user", // Correct alias for user
              attributes: ["id", "name"], // Fetch user who liked
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      postId: post.id,
      title: post.title,
      content: post.content,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
      comments: post.comments.map((comment) => ({
        userId: comment.user.id, // Updated to match the correct alias
        userName: comment.user.name,
        comment: comment.commentText,
      })),
      likes: post.likes.map((like) => ({
        userId: like.user.id, // Updated to match the correct alias
        userName: like.user.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






// // forumController.js
// import ForumPost from '../models/forum.model.js';

// // Create a new post
// export const createPost = async (req, res) => {
//     try {
//         const { title, content, userId } = req.body;
//         const newPost = new ForumPost({ title, content, userId });
//         await newPost.save();
//         res.status(201).json({ message: 'Post created successfully', newPost });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Comment on a post
// export const commentPost = async (req, res) => {
//     try {
//         const { postId, userId, comment } = req.body;
//         const post = await ForumPost.findById(postId);
//         if (!post) return res.status(404).json({ message: 'Post not found' });
//         post.comments.push({ userId, comment });
//         await post.save();
//         res.status(200).json({ message: 'Comment added successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Like a post
// export const likePost = async (req, res) => {
//     try {
//         const { postId, userId } = req.body;
        
        
//         console.log("Request body:", req.body);
        
//         const post = await ForumPost.findById(postId);
//         if (!post) {
//             console.log("Post not found:", postId);
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         if (!Array.isArray(post.likes)) {
//             post.likes = []; // Ensure likes is an array
//         }

//         if (!post.likes.includes(userId)) {
//             post.likes.push(userId);
//         }
        
//         await post.save();
//         res.status(200).json({ message: 'Post liked successfully', post });
//     } catch (error) {
//         console.error("Error in likePost:", error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };


// // Report a post
// export const reportPost = async (req, res) => {
//     try {
//         const { postId, userId, reason } = req.body;
//         const post = await ForumPost.findById(postId);
//         if (!post) return res.status(404).json({ message: 'Post not found' });
//         post.reports.push({ userId, reason });
//         await post.save();
//         res.status(200).json({ message: 'Post reported successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Bookmark a post
// export const bookmarkPost = async (req, res) => {
//     try {
//         const { postId, userId } = req.body;
//         const post = await ForumPost.findById(postId);
//         if (!post) return res.status(404).json({ message: 'Post not found' });
//         if (!post.bookmarks.includes(userId)) {
//             post.bookmarks.push(userId);
//         }
//         await post.save();
//         res.status(200).json({ message: 'Post bookmarked successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };
