import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";


export const signup = async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ error: "Bad request", errors: errors.array() });
    }

    try {
        let { email, password } = request.body;

        let saltKey = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password, saltKey);

        const newAdmin = await Admin.create({ email, password: hashedPassword });

        return response.status(201).json({ message: "Sign up success", Admin: newAdmin });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};
export const signIn = async (request, response) => {
    try {
        let { email, password } = request.body;
        let admin = await Admin.findOne({ raw: true, where: { email } });

        if (!admin) {
            return response.status(401).json({ error: "Bad request | Invalid email id" });
        }

        let hashPassword = admin.password;
        let status = bcrypt.compareSync(password, hashPassword);

        return status
            ? response.status(200).json({ message: "Sign in success", admin })
            : response.status(401).json({ error: "Bad request | Invalid password" });

    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } }); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const searchUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.destroy({ where: { id } });

        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
