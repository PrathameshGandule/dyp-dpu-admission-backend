import express from "express"
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv"
import connectDB from "./config/db.js"
import './utils/logger.js'
import checkCounters from "./utils/counterChecker.js";
// import cookieParser from "cookie-parser";

configDotenv()
const app = express();
const PORT = process.env.PORT || 5000
connectDB();
checkCounters();


app.use(cors({
    origin: "http://localhost:5173",  // Allow only your frontend URL
    credentials: true  // Allow cookies and authentication headers
}));

app.use(cookieParser());
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js"
import gateRoutes from "./routes/gateRoutes.js"
import deskRoutes from "./routes/deskRoutes.js"
import counterRoutes from "./routes/counterRoutes.js"

app.use('/api/auth', authRoutes);
app.use('/api/gate', gateRoutes);
app.use('/api/desk', deskRoutes);
app.use('/api', counterRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome message from base route"
    });
});

app.listen(PORT, () => logd(`Server listening on port ${PORT}`));
