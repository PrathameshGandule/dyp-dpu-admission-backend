import { Router } from "express";
import { auth_register , auth_login , whoami } from "../controllers/auth.js";
// import { sendOtptoStudent , verifyOtpFromStudent } from "../controllers/otpCont.js";

const router = Router();

router.post('/register', auth_register);
router.post('/login', auth_login);
router.get('/me', whoami)

// router.post('/gate/send-otp', sendOtptoStudent);
// router.post('/gate/verify-otp', verifyOtpFromStudent);

export default router;