import { Router } from "express";
import { verifyToken , verifyDesk } from "../middlewares/authMiddleware.js";
import { getDeskNullStudents , getStudentById , updateDesk1 , updateDesk2, updateDesk3 } from "../controllers/deskCont.js";

const router = Router();

// router.post('/select/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), setStudent);
// router.post('/release/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), releaseStudent);
router.get('/', verifyToken, verifyDesk("desk1", "desk2", "desk3"), getDeskNullStudents);
router.get('/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), getStudentById);
router.put('/1/update/:id', verifyToken, verifyDesk("desk1"), updateDesk1);
router.put('/2/update/:id', verifyToken, verifyDesk("desk2"), updateDesk2);
router.put('/3/update/:id', verifyToken, verifyDesk("desk3"), updateDesk3);

export default router;