import Journal from "../models/journal.model.js";

export const createJournal = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const journal = new Journal({ userId, title, content, date: new Date() });
        await journal.save();
        res.status(201).json({ message: "Journal entry created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchJournals = async (req, res) => {
    try {
        const { userId } = req.params;
        const journals = await Journal.find({ userId }).sort({ date: -1 });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Ensure updates are not empty
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No updates provided" });
        }

        // Validate the ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid journal ID" });
        }

        // Find and update the journal entry
        const journal = await Journal.findByIdAndUpdate(id, updates, { new: true });
        
        // Check if the journal entry was found and updated
        if (!journal) {
            return res.status(404).json({ error: "Journal not found" });
        }

        res.json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        await Journal.findByIdAndDelete(id);
        res.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchJournal = async (req, res) => {
    try {
        const { query, userId } = req.query;
        const results = await Journal.find({ userId, title: { $regex: query, $options: "i" } });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
