import express from 'express'
import { signUp ,loggIn ,logOut} from '../controllers/adminController.js';

const router = express.Router();

// REGISTER ADMIN
router.post("/signup", signUp);

//LOGGIN ADMIN
router.post("/login", loggIn);

//LOGOUT ADMIN
router.post("/logout", logOut);


export default router;