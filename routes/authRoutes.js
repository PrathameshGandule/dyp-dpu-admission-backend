import { Router } from "express";
import { gate_auth_register , gate_auth_login } from "../controllers/gateAuth.js";
import { desk_auth_register , desk_auth_login } from "../controllers/deskAuth.js";
import { sendOtptoStudent , verifyOtpFromStudent } from "../controllers/otpCont.js";

const router = Router();

router.post('/gate/register', gate_auth_register);
router.post('/gate/login', gate_auth_login);
router.post('/desk/register', desk_auth_register);
router.post('/desk/login', desk_auth_login);

router.post('/gate/send-otp', sendOtptoStudent);
router.post('/gate/verify-otp', verifyOtpFromStudent);

export default router;