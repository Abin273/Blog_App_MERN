import express from 'express'
import { loggIn ,getAllUsers, blockUnblockUser ,logOut} from '../controllers/adminController.js';
import {adminAuth} from '../middlewares/authMiddleware.js'

const router = express.Router();

//LOGGIN ADMIN
router.post("/login", loggIn);
router.get('/allUsers',adminAuth,getAllUsers);
router.put('/handleBlock/:id',adminAuth,blockUnblockUser);

//LOGOUT ADMIN
router.post("/logout", logOut);


export default router;