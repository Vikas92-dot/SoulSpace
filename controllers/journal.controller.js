import  Journal from "../models/journal.model.js";
import { Op } from "sequelize";

export const createJournal = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const journal = await Journal.create({ userId, title, content });
        res.status(201).json({ message: "Journal entry created successfully", journal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchJournals = async (req, res) => {
    try {
        const { userId } = req.params;
        const journals = await Journal.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
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
        //Yeh check karta hai ki object me koi key hai ya nahi
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No updates provided" });
        }

        // Find and update the journal entry
        const [updated] = await Journal.update(updates, { where: { id } });
        
        if (!updated) {
            return res.status(404).json({ error: "Journal not found" });
        }

        const updatedJournal = await Journal.findByPk(id);
        res.json(updatedJournal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Journal.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: "Journal not found" });
        }
        res.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchJournal = async (req, res) => {
    try {
        const { query, userId } = req.query;
        const results = await Journal.findAll({
            where: {
                userId,//SQL ka LIKE operator use karne ke liye, jo pattern-based search ke liye hota hai.
                title: { [Op.like]: `%${query}%` } //ex. query:meditation 
            }//It will search meditation in whole title 
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// import Journal from "../models/journal.model.js";

// export const createJournal = async (req, res) => {
//     try {
//         const { userId, title, content } = req.body;
//         const journal = new Journal({ userId, title, content, date: new Date() });
//         await journal.save();
//         res.status(201).json({ message: "Journal entry created successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const fetchJournals = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const journals = await Journal.find({ userId }).sort({ date: -1 });
//         res.json(journals);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const updateJournal = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;

//         // Ensure updates are not empty
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ error: "No updates provided" });
//         }

//         // Validate the ID format
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ error: "Invalid journal ID" });
//         }

//         // Find and update the journal entry
//         const journal = await Journal.findByIdAndUpdate(id, updates, { new: true });
        
//         // Check if the journal entry was found and updated
//         if (!journal) {
//             return res.status(404).json({ error: "Journal not found" });
//         }

//         res.json(journal);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const deleteJournal = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Journal.findByIdAndDelete(id);
//         res.json({ message: "Journal entry deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const searchJournal = async (req, res) => {
//     try {
//         const { query, userId } = req.query;
//         const results = await Journal.find({ userId, title: { $regex: query, $options: "i" } });
//         res.json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
