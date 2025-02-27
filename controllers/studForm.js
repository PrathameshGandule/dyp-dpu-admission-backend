import Student from "../models/Student.js";
import getNextStudId from "../utils/generateId.js";
import redisClient from "../config/redis.js";

const gate_form = async(req, res) => {
    try{
        const { firstname, middlename, lastname, phone, email, purpose, stream } = req.body;
        if(!firstname || !middlename || !lastname || !email || !phone || !purpose || !stream){
            return res.status(400).json({ message: "Fill all required fields !" });
        }

        const doesStudentExist = await Student.findOne({ $or: [{ phone } , { email }] });
        if(doesStudentExist){
            return res.status(400).json({ message: `This student already exists` });
        };

        const isEmailVerified = await redisClient.get(`email_verified:${email}`);
        if (!isEmailVerified) return res.status(400).json({ message: "Email not verified. Please verify your email first." });

        const studId = await getNextStudId();
        const newStudent = new Student({
            studId,
            firstname,
            middlename,
            lastname,
            phone,
            email,
            purpose,
            stream
        });
        await newStudent.save();
        return res.status(201).json({ message: "Student registered successfully !" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { gate_form };