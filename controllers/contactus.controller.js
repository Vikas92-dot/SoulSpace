import { validationResult } from "express-validator";
import ContactUs from "../models/contactUs.model.js";


export const getFeedback = async (req,res,next)=>{
    try {
        const feedbacks = await ContactUs.findAll();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error",error})
    }
}

export const fillForm = async (req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Bad request", errors });
        }

        let { name,email,subject,message} = req.body;
        const result = await ContactUs.create({name,email,subject,message});

        res.status(201).json({message: "Contact form filled successfully",result})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error",error})
    }
}