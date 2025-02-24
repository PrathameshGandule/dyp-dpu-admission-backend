import { Router } from "express";
import { verifyToken , verifyDesk } from "../middlewares/authMiddleware.js";
import { setStudent , updateDesk1 , updateDesk2 } from "../controllers/deskCont.js";

const router = Router();

router.post('/select/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), setStudent);
router.put('/1/update/:id', verifyToken, verifyDesk("desk1"), updateDesk1);
router.put('/2/update/:id', verifyToken, verifyDesk("desk2"), updateDesk2);

export default router;