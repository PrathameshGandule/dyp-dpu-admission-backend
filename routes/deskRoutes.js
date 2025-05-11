import { Router } from "express";
import { verifyToken , verifyDesk } from "../middlewares/authMiddleware.js";
import { getDeskNullStudents , getStudentById, getStudentsFromDate , updateDesk1 , updateDesk2, updateDesk3, updateDesk4, getStudentStats, getStreamDistribution, getCounselorCount } from "../controllers/deskCont.js";

const router = Router();

// router.post('/select/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), setStudent);
// router.post('/release/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3"), releaseStudent);
router.get('/', verifyToken, verifyDesk("desk1", "desk2", "desk3", "admin"), getDeskNullStudents);
router.get('/date/:date', verifyToken, verifyDesk("admin"), getStudentsFromDate)
router.put('/1/update/:id', verifyToken, verifyDesk("desk1"), updateDesk1);
router.put('/2/update/:id', verifyToken, verifyDesk("desk2"), updateDesk2);
router.put('/3/update/:id', verifyToken, verifyDesk("desk3"), updateDesk3);
router.put('/4/update/:id', verifyToken, verifyDesk("admin"), updateDesk4);
router.get('/student-count',  getStudentStats);
router.get('/stream-distribution',  getStreamDistribution);
router.get('/counselor-count',getCounselorCount);
router.get('/:id', verifyToken, verifyDesk("desk1", "desk2", "desk3", "admin"), getStudentById);

export default router;