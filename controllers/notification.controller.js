import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

//Set Notification for User
export const setNotification = async (req, res) => {
  const { userId, type, time } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const notification = await Notification.create({ userId, type, time });
    res.json({ message: "Notification scheduled successfully!", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Notifications
export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: { userId },
      include: [{ model: User, attributes: ["email"] }],
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
