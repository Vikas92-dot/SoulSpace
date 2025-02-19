import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: String,
    likes: { type: [String], default: [] },  // Ensure likes is an array
    comments: [{ userId: String, comment: String }],
    reports: [{ userId: String, reason: String }],
    bookmarks: { type: [String], default: [] }
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);
export default ForumPost;
