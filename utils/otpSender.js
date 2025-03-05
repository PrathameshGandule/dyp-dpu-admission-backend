// // import { createTransport } from "nodemailer";
// import twilio from "twilio";
// import { configDotenv } from "dotenv";
// configDotenv();

// const accountSid = process.env.TWILIO_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const serviceId = process.env.TWILIO_SERVICE_ID
// const client = twilio(accountSid, authToken);

// // const transporter = createTransport({
// //     service: "Gmail",
// //     host: "smtp.gmail.com",
// //     port: 465,
// //     secure: true,
// //     auth: {
// //         user: process.env.USER_EMAIL,
// //         pass: process.env.APP_PASS
// //     },
// // });

// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // const sendOtp = async(mailToSend, otp) => {
// //     const mailOptions = {
// //         from: process.env.USER_EMAIL,
// //         to: mailToSend,
// //         subject: "DYPDPU OTP",
// //         html: `<h4>Your otp for dypdpu admission</h4><br><h4>It's valid for 1 minute</h4><br><h1>${otp}</h1>`,
// //     };

// //     transporter.sendMail(mailOptions, (error, info) => {
// //         if(err) logd(err);
// //         else logd("Email sent : ", info.response);
// //     });
// // }

// const sendOtp = async (phoneNumber) => {
//     try {
//         const verification = await client.verify.v2.services(serviceId)
//             .verifications
//             .create({ to: phoneNumber, channel: "sms" });

//         console.log("OTP Sent, SID:", verification.sid);
//         return verification.sid;
//     } catch (err) {
//         logd(err);
//         // return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// const verifyOtp = async (phoneNumber, otp) => {
//     try {
//         const verificationCheck = await client.verify.v2.services(serviceId)
//             .verificationChecks
//             .create({ to: phoneNumber, code: otp });

//         if (verificationCheck.status === "approved") {
//             console.log("OTP Verified Successfully!");
//             return true;
//         } else {
//             console.log("Invalid OTP!");
//             return false;
//         }
//     } catch (err) {
//         logd(err);
//         // return res.status(500).json({ message: "Internal Server Error" });
//     }
// };




// export { generateOtp, sendOtp, verifyOtp };