import express from "express";
import { createJournal, fetchJournals, updateJournal, deleteJournal, searchJournal } from "../controllers/journal.controller.js";

const router = express.Router();

router.post("/create", createJournal);
router.get("/fetch/:userId", fetchJournals);
router.put("/update/:id", updateJournal);
router.delete("/delete/:id", deleteJournal);
router.get("/search", searchJournal);

export default router;
