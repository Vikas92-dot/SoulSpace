import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Gmail } from "../middleware/SendMail.js";
import { Template } from "../middleware/Template.js";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}; 

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors });
        }

        const { name, email, profilePic, level } = req.body;
        let { password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password
        let saltKey = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, saltKey);

        //generate otp
        const ada = new Gmail();
        let otpCode = ada.generateOtp(6);
        let otp = JSON.stringify({ code: otpCode, timestamp: Date.now() });

        // Create the user
        const user = await User.create({ name, email, password, profilePic, level ,otp });

        const data = {
            appName:"SoulSpace",
            email: user.email,
            otp: JSON.parse(user.otp).code,
            name: user.name,
            subject: "OTP Verification",
            year: new Date().getFullYear()
        }
        
        const templateData = new Template().getOtpTemplate(data);
        ada.mail(data,templateData);


        // Generate a token only during registration
        const token = generateToken(user.id);

        res.cookie("token", token, {
            httpOnly: true, 
            secure: false,  
            sameSite: "lax",  
            maxAge: 30 * 24 * 60 * 60 * 1000 
        });

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                level: user.level,
                otp: JSON.parse(user.otp).code
            } 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
                

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        console.log(user.otp);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Parse stored OTP JSON
        const storedOtp = JSON.parse(user.otp);

        // Check OTP expiration (5 minutes = 300000 ms)
        if (Date.now() - storedOtp.timestamp > 300000) {
            return res.status(400).json({ error: "OTP has expired" });
        }

        // Verify OTP
         if (storedOtp.code !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Clear OTP after successful verification
        await user.update({ otp: null });

        return res.status(200).json({ message: "OTP verified successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ raw: true, where: { email } });

        if (user) {
            let hashPassword = user.password;
            let status = bcrypt.compareSync(password, hashPassword);

            if (status) {
                const token = generateToken(user.id);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
                return res.status(200).json({
                    message: "Login successful",
                    user,
                    token
                });
            } else {
                return res.status(401).json({ error: "Invalid password" });
            }
        } else {
            return res.status(401).json({ error: "Invalid email" });
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid credentials" });
    }
};


export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.level = req.body.level || user.level;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();
            res.json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                level: updatedUser.level
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


