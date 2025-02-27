import express from "express";
import {
  viewQuotes,
  saveQuote,
  createQuote,
  updateQuote,
  deleteQuote
} from "../controllers/quote.controller.js";

const router = express.Router();

//Admin features
router.post("/create", createQuote);
router.put("/update/:id", updateQuote);
router.delete("/delete/:id", deleteQuote);
//User features
router.get("/view", viewQuotes);
router.post("/save", saveQuote);

export default router;
