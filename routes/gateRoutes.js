import { Router } from "express";
import { verifyToken , verifyGateLogin } from "../middlewares/authMiddleware.js";
import { gate_form } from "../controllers/studAuth.js";

const router = Router();

router.post('/form', verifyToken, verifyGateLogin, gate_form);

export default router;