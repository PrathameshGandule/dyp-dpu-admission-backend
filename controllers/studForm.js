import Student from "../models/Student.js";
import getNextStudId from "../utils/generateId.js";
import sendMail from "../utils/mailSender.js";
// import redisClient from "../config/redis.js";

const gate_form = async (req, res) => {
    try {
        const { firstname, lastname, gender, phone, email, purpose, stream, visitors = 0 } = req.body;
        if (!firstname || !lastname || !gender || !email || !phone || !purpose || !stream) {
            return res.status(400).json({ message: "Fill all required fields !" });
        }

        const doesStudentExist = await Student.findOne({ $or: [{ phone }, { email }] });
        if (doesStudentExist) {
            return res.status(400).json({ message: `This student already exists` });
        } else if (stream != "eng" && stream != "mba" && stream != "phr" && stream != "libart") {
            return res.status(400).json({ message: "Invalid stream" });
        }

        // const isphoneVerified = await redisClient.get(`phone_verified:${email}`);
        // if (!isphoneVerified) return res.status(400).json({ message: "Phone number not verified. Please verify it first." });

        const studId = await getNextStudId(stream);
        const newStudent = new Student({
            studId,
            firstname,
            lastname,
            gender,
            phone,
            email,
            purpose,
            stream,
            gender,
            visitors
        });
        newStudent.logs.push({ entryTime: new Date() });
        await newStudent.save();
        await sendMail(email, studId);
        return res.status(201).json({ message: "Student registered successfully !", studId });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getBasicInfo = async (req, res) => {
    try {
        let studId = req.params.studId;
        if (!studId) {
            return res.status(400).json({ message: "Please provide valid student id" });
        }
        const stud = await Student.findOne({ studId }).select("studId firstname lastname currentDesk -_id");
        if (!stud) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(stud);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const gate_exit = async (req, res) => {
    try {
        let studId = req.params.studId;
        if (!studId) {
            return res.status(400).json({ message: "Please provide valid student id" });
        }
        const stud = await Student.findOne({ studId }).select("logs -_id");
        if (!stud) {
            return res.status(404).json({ message: "Student not found" });
        }
        if (stud.logs.at(-1).exitTime == null) {
            stud.logs.at(-1).exitTime = new Date();
        }
        await stud.save();
        return res.status(200).json({ message: "Exit successfull" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const entryWithId = async (req, res) => {
    try {
        let studId = req.params.studId;
        if (!studId) {
            return res.status(400).json({ message: "Please provide valid student id" });
        }
        const stud = await Student.findOne({ studId }).select("logs -_id");
        if (!stud) {
            return res.status(404).json({ message: "Student not found" });
        }
        if(stud.logs.at(-1).exitTime != null){
            return res.status(400).json({ message: "First do an entry before exit" })
        }
        stud.logs.push({ entryTime: new Date() });
        await stud.save();
        return res.status(200).json({ message: "Entry updated" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const whatIsMyStudId = async (req, res) => {
    try {
        let { email=null, phone=null } = req.query;
        const query = {};
        if (phone) query.phone = phone;
        if (email) query.email = email;
        if (!email && !phone) {
            return res.status(400).json({ message: "Provide atleast email or phone number" });
        }
        const student = await Student.findOne({ $or: [query] }).select("studId -_id");
        if (!student) {
            return res.status(400).json({ message: `Student not found` });
        }
        return res.status(200).json({ studId: student.studId });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { gate_form, getBasicInfo, gate_exit, entryWithId, whatIsMyStudId };