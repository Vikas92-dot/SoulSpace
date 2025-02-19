import express from 'express';
import { 
    login, 
    getAllUsers, 
    searchUserById, 
    deleteUserById
} from '../controllers/admin.controller.js';


const router = express.Router();

/** Admin Authentication */
router.post('/login', login);

/** User Management */
router.get('/users', getAllUsers);
router.get('/users/:id', searchUserById);
router.delete('/users/:id', deleteUserById);



export default router;
