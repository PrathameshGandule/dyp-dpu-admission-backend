import { Router } from "express";
import {
    auth_register,
    auth_login,
    whoami,
    logout,
    allowLogin,
    denyLogin,
    getAllCollegeAuthorities
} from "../controllers/auth.js";
import { verifyToken, verifyDesk } from "../middlewares/authMiddleware.js";

import { forgotPassword, changePassword } from "../controllers/forgotPassword.js";


const router = Router();

router.post('/register', auth_register);
router.post('/login', auth_login);
router.get('/me', verifyToken, whoami)
router.post("/logout", logout);

router.post('/allow/:id', verifyToken, verifyDesk("admin"), allowLogin);
router.post('/deny/:id', verifyToken, verifyDesk("admin"), denyLogin);
router.get('/allusers',  getAllCollegeAuthorities);

router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

// router.post('/gate/send-otp', sendOtptoStudent);
// router.post('/gate/verify-otp', verifyOtpFromStudent);

export default router;