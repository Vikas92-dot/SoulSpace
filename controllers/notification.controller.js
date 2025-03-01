import Notification from '../models/notification.model.js';

// Set a reminder
export const setReminder = async (req, res) => {
    try {
        const { userId, type, time, status = 1 } = req.body; // Ensure `type` is used instead of `message`
        
        // Validate required fields
        if (!userId || !type || !time) {
            return res.status(400).json({ message: "User ID, type, and time are required" });
        }

        const newReminder = new Notification({
            userId,
            type,
            time,  // Ensure correct format if using `datetime`
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newReminder.save();
        res.status(201).json({ message: 'Reminder set successfully', newReminder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all reminders for a user
export const getReminders = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const reminders = await Notification.findOne({ userId });
        res.status(200).json({ message: "Reminders fetched successfully", reminders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReminder = await Notification.destroy({where: {id}});
        
        if (!deletedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error', error });
    }
};
