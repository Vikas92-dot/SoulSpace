
import Notification from '../models/notification.model.js';

// Set a reminder
export const setReminder = async (req, res) => {
    try {
        const { userId, message, time } = req.body;
        const newReminder = new Notification({ userId, message, time });
        await newReminder.save();
        res.status(201).json({ message: 'Reminder set successfully', newReminder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all reminders for a user
export const getReminders = async (req, res) => {
    try {
        const { userId } = req.query;  // Use req.query for GET requests
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const reminders = await Notification.find({ userId });

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
        await Notification.findByIdAndDelete(id);
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
