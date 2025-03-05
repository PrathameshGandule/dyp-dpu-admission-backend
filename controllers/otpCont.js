// import redisClient from "../config/redis.js"
// import { configDotenv } from "dotenv"
// import { sendOtp , verifyOtp } from "../utils/otpSender.js";
// import bcrypt from "bcryptjs";
// configDotenv();

// const { compare } = bcrypt;
// // const { totp , generateSecret } = speakeasy;

// const sendOtptoStudent = async(req, res) => {
//     try{
//         const phoneNumber = req.body.phone;
//         if(!phoneNumber){
//             return res.status(400).json({ message: "Please provide valid phoneNumber" });
//         }
//         // const otp = speakeasy.totp({
//         //     secret: process.env.OTP_SECRET || speakeasy.generateSecret().base32,
//         //     encoding: "base32",
//         //     digits: 6,
//         //     step: 120 // OTP valid for 5 minutes
//         // });
//         // const hashedOtp = await bcrypt.hash(otp, 8);
//         // await redisClient.setEx(`otp:${phoneNumber}`, 120, hashedOtp);
//         // await sendOtp(phoneNumber, otp);
//         await sendOtp(phoneNumber);
//         return res.status(200).json("Otp sent successfully !");    
//     } catch(err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const verifyOtpFromStudent = async(req, res) => {
//     try{
//         const phoneNumber = req.body.phone;
//         const otp = req.body.otp;
//         if(!phoneNumber || !otp){
//             return res.status(400).json({ message: "Both phoneNumber and otp are required" });
//         }

//         // const storedOtpHash = await redisClient.get(`otp:${phoneNumber}`);
//         // if (!storedOtpHash) return res.status(400).json({ message: "OTP expired or invalid" });

//         // const isMatch = await compare(otp, storedOtpHash);
//         // if (!isMatch) return res.status(400).json({ message: "Incorrect OTP" });

//         // await redisClient.del(`otp:${phoneNumber}`);
//         const isVerified = await verifyOtp(phoneNumber, otp);

//         if(isVerified){
//             await redisClient.setEx(`phone_verified:${phoneNumber}`, 300, "true");
//         } else {
//             return res.status(400).json({ message: "Otp is invalid" });
//         }

//         return res.status(200).json({ message: "OTP verified successfully! You can now register." });
//     } catch(err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// export { sendOtptoStudent , verifyOtpFromStudent };