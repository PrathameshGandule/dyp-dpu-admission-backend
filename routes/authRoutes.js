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

router.post('/register', verifyToken, verifyDesk("desk4"), auth_register);
router.post('/login', auth_login);
router.get('/me', verifyToken, whoami)
router.post("/logout", logout);

router.post('/allow/:id', verifyToken, verifyDesk("desk4"), allowLogin);
router.post('/deny/:id', verifyToken, verifyDesk("desk4"), denyLogin);
router.get('/allusers', verifyToken, verifyDesk("desk4"), getAllCollegeAuthorities);

router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

// router.post('/gate/send-otp', sendOtptoStudent);
// router.post('/gate/verify-otp', verifyOtpFromStudent);

export default router;