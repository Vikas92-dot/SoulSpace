import MeditationSession from "../models/meditation.model.js";

export const logSession = async (req, res) => {
    try {
        const { userId, duration, notes } = req.body;
        const session = new MeditationSession({ userId, duration, date: new Date(), notes });
        await session.save();
        res.status(201).json({ message: "Meditation logged successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const viewProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const sessions = await MeditationSession.find({ userId }).sort({ date: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAudioCategories = async (req, res) => {
    res.json(["Stress Relief", "Anxiety", "Sleep", "Focus"]);
};

export const getVideoCategories = async (req, res) => {
    res.json(["Guided Meditation", "Yoga", "Breathing Exercises"]);
};
