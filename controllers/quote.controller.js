import Quote from "../models/quote.model.js";

// Create a new quote
export const createQuote = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = new Quote({ text, author });
    await newQuote.save();
    res.status(201).json({ message: "Quote created successfully", newQuote });
  } catch (error) {
    res.status(500).json({ message: "Error creating quote", error });
  }
};

// Update a quote
export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuote = await Quote.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ message: "Quote updated successfully", updatedQuote });
  } catch (error) {
    res.status(500).json({ message: "Error updating quote", error });
  }
};

// Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quote", error });
  }
};

// View all quotes
export const viewQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes", error });
  }
};

// Like a quote
export const likeQuote = async (req, res) => {
  try {
    const { id } = req.body;
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    quote.likes += 1;
    await quote.save();
    res.json({ message: "Quote liked", quote });
  } catch (error) {
    res.status(500).json({ message: "Error liking quote", error });
  }
};

// Save a quote
export const saveQuote = async (req, res) => {
  try {
    const { id, userId } = req.body;
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    if (!quote.savedBy.includes(userId)) {
      quote.savedBy.push(userId);
    }
    await quote.save();
    res.json({ message: "Quote saved", quote });
  } catch (error) {
    res.status(500).json({ message: "Error saving quote", error });
  }
};
