import { Router } from "express";
import { verifyToken , verifyGateLogin, verifyDesk } from "../middlewares/authMiddleware.js";
import { gate_form , getBasicInfo , gate_exit , entryWithId } from "../controllers/studForm.js";

const router = Router();

router.post('/form', verifyToken, verifyGateLogin, gate_form);
router.get('/info/:studId', verifyToken, verifyGateLogin, getBasicInfo);
router.post('/exit/:studId', verifyToken, verifyGateLogin, gate_exit);
router.post('/direct-entry/:studId', verifyToken, verifyGateLogin, entryWithId);

export default router;