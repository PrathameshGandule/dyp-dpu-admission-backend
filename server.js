import express from "express"
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import './utils/logger.js'

configDotenv()
const app = express();
const PORT = process.env.PORT || 5000
connectDB();

// using express json for handling body
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js"
import gateRoutes from "./routes/gateRoutes.js"
import deskRoutes from "./routes/deskRoutes.js"

app.use('/api/auth', authRoutes);
app.use('/api/gate', gateRoutes);
app.use('/api/desk', deskRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome message from base route"
    });
});

app.listen(PORT, () => logd(`Server listening on port ${PORT}`));
