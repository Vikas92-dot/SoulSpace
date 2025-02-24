import express from 'express';
import {body} from "express-validator";
import { 
    signup, 
    signIn,
    getAllUsers, 
    searchUserById, 
    deleteUserById
} from '../controllers/admin.controller.js';


const router = express.Router();

// Admin Authentication
router.post('/sign-up',
    body("email","Invalid email Id").isEmail(),
    body("email","Email id is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    body("password","Password length should be 6 to 10").isLength({min:6,max:10}),signup);
router.post('/sign-in', signIn); 

// User Management 
router.get('/users', getAllUsers);
router.get('/users/:id', searchUserById);
router.delete('/users/:id', deleteUserById);



export default router;
