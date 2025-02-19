import Admin from "../models/admin.model.js";
import User from "../models/user.model.js"; // Import User model

// Admin Login
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **1. Get All Users**
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **2. Search User by ID**
export const searchUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **3. Delete User by ID**
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
