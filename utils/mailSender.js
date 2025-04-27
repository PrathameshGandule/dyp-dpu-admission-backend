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

let htmlTemplate = `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#ffffff; color:#333;">
    <div style="max-width:600px; margin:0 auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
      <div style="background-color:#b30000; padding:20px; text-align:center; color:#fff;">
        <h2 style="margin:0;">DR. D. Y. PATIL DNYAN PRASAD UNIVERSITY, PUNE</h2>
        <p style="font-size:12px; margin-top:8px;">
          Established under the Maharashtra Private Universities (Establishment and Regulation) (Amendment) Act, 2024 (Mah. Act No. 20 of 2024)
        </p>
      </div>

      <div style="padding:20px; background-color:#fff;">
        <h3 style="color:#b30000;">Welcome to the Campus!</h3>
        <p>Dear Student,</p>
        <p>We are excited to welcome you to DR. D. Y. Patil Dnyan Prasad University, Pune. You are now part of a thriving community of learners and achievers.</p>

        <p><strong>Your Unique Token:</strong></p>
        <p style="background-color:#f9f9f9; padding:10px; border-left:4px solid #b30000; font-weight:bold; font-size:18px; letter-spacing:1px;">
          {{TOKEN_PLACEHOLDER}}
        </p>

        <p style="margin-top:30px;">Please use this token for further process</p>
        <p>Now you may explore our campus</p>
        <p>Or proceed towards counselling section</p>
        
        <hr style="margin:30px 0; border:none; border-top:1px solid #eee;">

        <p style="font-size:13px; color:#888;">
          ⚠️ If you are not the intended recipient of this email or believe you received this in error, please reply to this mail immediately or contact the administration.
        </p>
      </div>

      <div style="background-color:#f5f5f5; text-align:center; padding:10px; font-size:12px; color:#999;">
        © 2025 DR. D. Y. Patil Dnyan Prasad University, Pune. All rights reserved.
      </div>
    </div>
  </body>
</html>`

const sendWelcomeMail = async(email, token) => {
    const htmlContent = htmlTemplate.replace('{{TOKEN_PLACEHOLDER}}', token);
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Welcome to DR. D. Y. PATIL DNYAN PRASAD UNIVERSITY, PUNE",
        html: htmlContent,
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) logd(err);
        else logd("Email sent : ", info.response);
    });
}

const sendRegistrationMail = async(name, email, type) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Your login credentials for DYPDPU counselling",
        html: `Hello ${name}<br>
                You've been assigned counselling type of ${type} at DYPDPU<br>
                Go to login page and use forgot password to set your new password`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) logd(err);
        else logd("Email sent : ", info.response);
    }); 
}

const sendOtpMail = async(email, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Otp to set new password",
        html: `Your otp to set new password is ${otp}<br>
                You have 5 minutes to set new password`,
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) logd(err);
        else logd("Email sent : ", info.response);
    });
}

export { sendWelcomeMail, sendRegistrationMail, sendOtpMail };