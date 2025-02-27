// import redisClient from "../config/redis.js"
// import { configDotenv } from "dotenv"
// import sendOtp from "../utils/otpMailSender.js";
// import bcrypt from "bcryptjs";
// import speakeasy from "speakeasy";
// configDotenv();

// const { compare } = bcrypt;
// // const { totp , generateSecret } = speakeasy;

// const sendOtptoStudent = async(req, res) => {
//     try{
//         const email = req.body.email;
//         if(!email){
//             return res.status(400).json({ message: "Please provide valid email" });
//         }
//         const otp = speakeasy.totp({
//             secret: process.env.OTP_SECRET || speakeasy.generateSecret().base32,
//             encoding: "base32",
//             digits: 6,
//             step: 120 // OTP valid for 5 minutes
//         });
//         const hashedOtp = await bcrypt.hash(otp, 8);
//         await redisClient.setEx(`otp:${email}`, 120, hashedOtp);
//         await sendOtp(email, otp);
//         return res.status(200).json("Otp sent successfully !");    
//     } catch(err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const verifyOtpFromStudent = async(req, res) => {
//     try{
//         const email = req.body.email;
//         const otp = req.body.otp;
//         if(!email || !otp){
//             return res.status(400).json({ message: "Both email and otp are required" });
//         }

//         const storedOtpHash = await redisClient.get(`otp:${email}`);
//         if (!storedOtpHash) return res.status(400).json({ message: "OTP expired or invalid" });

//         const isMatch = await compare(otp, storedOtpHash);
//         if (!isMatch) return res.status(400).json({ message: "Incorrect OTP" });

//         await redisClient.del(`otp:${email}`);

//         await redisClient.setEx(`email_verified:${email}`, 600, "true");

//         return res.status(200).json({ message: "OTP verified successfully! You can now register." });
//     } catch(err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// export { sendOtptoStudent , verifyOtpFromStudent };