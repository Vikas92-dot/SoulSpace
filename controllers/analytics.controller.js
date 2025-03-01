import  User  from '../models/user.model.js';
import  ForumPost  from '../models/forum.model.js';  
import  MeditationSession  from '../models/meditation.model.js';  
import { Op } from 'sequelize';

// View user login history
export const viewUsersLogin = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'level', 'createdAt'], // Adjusted attributes based on schema
      order: [['createdAt', 'DESC']], // Sort by account creation date
    });

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Login history retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching login history", error: error.message });
  }
};

// View meditation session history
export const viewUsersMeditation = async (req, res) => {
  try {
    const sessions = await MeditationSession.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'email'], // Fetch user details
      }],
      attributes: ['id', 'title', 'description', 'category', 'duration', 'notes', 'createdAt'],
      order: [['createdAt', 'DESC']], // Sort by most recent session
    });

    if (!sessions.length) {
      return res.status(404).json({ message: "No meditation sessions found" });
    }

    res.status(200).json({ message: "Meditation sessions retrieved successfully", sessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching meditation sessions", error: error.message });
  }
};

// View forum interactions
export const viewForum = async (req, res) => {
  try {
    const forumPosts = await ForumPost.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'email'], // Fetch user details
      }],
      attributes: ['id', 'title', 'content', 'createdAt'],
      order: [['createdAt', 'DESC']], // Sort by most recent post
    });

    if (!forumPosts.length) {
      return res.status(404).json({ message: "No forum posts found" });
    }

    res.status(200).json({ message: "Forum posts retrieved successfully", forumPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching forum posts", error: error.message });
  }
};












// import userModel from '../models/user.model.js';
// import MeditationSession from "../models/meditation.model.js";
// import ForumPost from "../models/forum.model.js"; // Import forum post model

// // View user login history
// export const viewUsersLogin = async (req, res) => {
//   try {
//       const users = await userModel.find({}, "name email loginHistory").sort({ "loginHistory": -1 });

//       if (!users.length) {
//           return res.status(404).json({ message: "No users found" });
//       }

//       res.status(200).json({ message: "Login history retrieved successfully", users });
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching login history", error: error.message });
//   }
// };


// // View meditation session history
// export const viewUsersMeditation = async (req, res) => {
//   try {
//       // Fetch all meditation sessions and populate user details
//       const sessions = await MeditationSession.find()
//           .populate("userId", "name email") // Fetch user name and email
//           .sort({ date: -1 }); // Sort by most recent session

//       if (!sessions.length) { 
//           return res.status(404).json({ message: "No meditation sessions found" });
//       }

//       res.status(200).json({ message: "Meditation sessions retrieved successfully", sessions });
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching meditation sessions", error: error.message });
//   }
// };

// // View forum interactions
// export const viewForum = async (req, res) => {
//   try {
//     // Fetch all forum posts and populate user details
//     const forumPosts = await ForumPost.find()
//       .populate("userId", "name email") // Fetch user name and email from User model
//       .sort({ _id: -1 }); // Sort by most recent post

//     if (!forumPosts.length) {
//       return res.status(404).json({ message: "No forum posts found" });
//     }

//     res.status(200).json({ message: "Forum posts retrieved successfully", forumPosts });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching forum posts", error: error.message });
//   }
// };

