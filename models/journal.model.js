import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    date: Date
}, { timestamps: true });

export default mongoose.model("Journal", JournalSchema);
