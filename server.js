import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import AdminRouter from './routes/admin.route.js';
//
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
