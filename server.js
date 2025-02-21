import express from "express"
import { configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import './utils/logger.js'

configDotenv()
const app = express();
const PORT = process.env.PORT || 5000
connectDB();

// using express json for handling body
app.use(express.json());

import authRoutes from "./routes/authRoutes.js"
import gateRoutes from "./routes/gateRoutes.js"

app.use('/api/auth', authRoutes);
app.use('/api/gate', gateRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome message from base route"
    });
});

app.listen(PORT, () => logd(`Server listening on port ${PORT}`));
