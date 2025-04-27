import CollegeAuthority from "../models/CollegeAuthority.js";
import { sendOtpMail } from "../utils/mailSender.js";
import bcryptjs from "bcryptjs";
const { hash , compare } = bcryptjs;

const forgotPassword = async(req, res) => {
    try{
        const email = req.body.email;
        if(!email){
            return res.status(400).json({ message: "Please provide a valid email" })
        }
        const user = await CollegeAuthority.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        if(!user.isLoginAllowed){
            return res.status(400).json({ message: "You are not allowed to operate" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await hash(otp, 10);
        user.otp = hashedOtp;
        user.timeForOperation = new Date(Date.now() + 5*60*1000)
        await user.save();
        await sendOtpMail(email, otp);
        return res.status(200).json({ message: "Please check your mail for otp, you have 5 minutes", email: user.email });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const changePassword = async(req, res) => {
    try{
        const { email , otp , newPassword } = req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({ message: "Please provide email, otp and new password to set" });
        }
        const otpString = String(otp);
        const newPasswordString = String(newPassword);
        const user = await CollegeAuthority.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.timeForOperation || Date.now() > user.timeForOperation.getTime()) {
            return res.status(400).json({ message: "Otp is expired" });
        }        
        const isOtpValid = await compare(otpString, user.otp);
        if(!isOtpValid){
            return res.status(400).json({ message: "Invalid otp" });
        }
        const hashedPassword = await hash(newPasswordString, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.timeForOperation = null;
        user.isPasswordSet = true;
        await user.save();
        return res.status(200).json({ message: "New password set successfully" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { forgotPassword , changePassword };