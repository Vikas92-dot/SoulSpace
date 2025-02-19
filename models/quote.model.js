import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
    {
      text: { type: String, required: true },
      author: { type: String, default: "Unknown" },
      likes: { type: Number, default: 0 },
      savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  );


export default mongoose.model("Quote", QuoteSchema);
