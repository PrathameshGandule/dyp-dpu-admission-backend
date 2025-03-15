import Counter from "../models/Counter.js";
import { Router } from "express";
const router = Router();

router.post('/counter', async(req, res) => {
    let { counterId } = req.body;
    const counter = new Counter({ counterId });
    await counter.save();
    return res.status(201).json({ message: `New counter with ${counterId} created` });
});

export default router;