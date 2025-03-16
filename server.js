import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import AdminRouter from './routes/admin.route.js';
import userRoutes from './routes/user.route.js';
import meditationRoutes from './routes/meditation.route.js';
import journalRoutes from './routes/journal.route.js';
import quoteRoutes from './routes/quote.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import forumRoutes from './routes/forum.route.js';
import notificationRoutes from './routes/notification.route.js'
import  Association  from './models/association.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import cron from "node-cron";
import Notification from "./models/notification.model.js";
import User from "./models/user.model.js";
import { Gmail } from "./middleware/SendMail.js";
import { Op } from "sequelize";

const gmail = new Gmail();

cron.schedule("* * * * *", async () => {
  try {
    console.log("🔔 Running cron job for sending notifications...");

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000); // 1 minute ago
    const oneMinuteLater = new Date(now.getTime() + 60000); // 1 minute later

    console.log(`📅 Checking notifications between ${oneMinuteAgo} and ${oneMinuteLater}`);

    // Fetch notifications within the 1-minute window with status = true
    const notifications = await Notification.findAll({
      where: {
        time: { [Op.between]: [oneMinuteAgo, oneMinuteLater] },
        status: true,
      },
      include: [{ model: User, attributes: ["email"] }],
    });

    console.log(`🔍 Found ${notifications.length} notifications to process`);
    const simpleNotifications = notifications.map(n => n.get({ plain: true }));
    console.log(simpleNotifications);
    //console.log(simpleNotifications[0].user); // Access user directly

    

    // Prepare emails to send
    const emailPromises = notifications.map(async (notification) => {
      if (simpleNotifications[0].user.email) {
        console.log(`📧 Sending email to: ${simpleNotifications[0].user.email}`);
        await gmail.sendNotification(simpleNotifications[0].user.email, `Reminder: ${notification.type}`);
        return notification.id;
      }
      console.warn(`⚠️ Notification ID ${notification.id} has no associated email.`);
      return null;
    });

    // Wait for all emails to be sent
    const sentNotificationIds = (await Promise.all(emailPromises)).filter(Boolean);

    // Update the status of sent notifications
    if (sentNotificationIds.length > 0) {
      await Notification.update(
        { status: false }, // Mark notifications as sent
        { where: { id: sentNotificationIds } }
      );
      console.log(`✅ Successfully updated status for ${sentNotificationIds.length} notifications.`);
    } else {
      console.log("⚠️ No notifications were updated.");
    }
  } catch (error) {
    console.error("❌ Error in cron job:", error);
  }
});


dotenv.config();



const app = express();


// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.use('/admin', AdminRouter);
app.use("/analytics",analyticsRoutes);
app.use("/users", userRoutes);
app.use("/meditation", meditationRoutes);
app.use("/journal", journalRoutes);
app.use("/quotes", quoteRoutes);
app.use("/forum", forumRoutes);
app.use("/notifications", notificationRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
