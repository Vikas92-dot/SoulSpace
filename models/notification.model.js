import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: String,
    time: String
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
