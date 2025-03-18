import express from 'express';
import { body } from 'express-validator';
import { fillForm,getFeedback } from '../controllers/contactus.controller.js';

const router = express.Router();

router.post("/fill-form",
    body("name","Name required").notEmpty(),
    body("email","Invalid email id").isEmail(),
    body("subject","Subject required").notEmpty(),
    body("message","Message required").notEmpty()
    ,fillForm);

router.get("/get-feedback",getFeedback);

export default router;