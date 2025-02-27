import { createTransport } from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const transporter = createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASS
    },
});


const sendOtp = async(mailToSend, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: mailToSend,
        subject: "DYPDPU OTP",
        html: `<h4>Your otp for dypdpu admission</h4><br><h4>It's valid for 1 minute</h4><br><h1>${otp}</h1>`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(err) logd(err);
        else logd("Email sent : ", info.response);
    });
}

// export default sendOtp;