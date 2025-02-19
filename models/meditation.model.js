import mongoose from "mongoose";

const MeditationSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    duration: Number,
    date: Date,
    notes: String
}, { timestamps: true });

export default mongoose.model("MeditationSession", MeditationSessionSchema);
