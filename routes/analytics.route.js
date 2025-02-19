import express from 'express';
import { viewUsersLogin, viewUsersMeditation, viewForum } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/viewusersLogin', viewUsersLogin);
router.get('/viewusersMeditation', viewUsersMeditation);
router.get('/viewforum', viewForum);

export default router;
