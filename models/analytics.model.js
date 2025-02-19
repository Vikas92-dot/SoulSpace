import mongoose from 'mongoose';

const UserAnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginHistory: [{ type: Date }],
  meditationSessions: [{ type: Date }],
  forumInteractions: [{ type: Date }]
}, { timestamps: true });

export default mongoose.model('UserAnalytics', UserAnalyticsSchema);
