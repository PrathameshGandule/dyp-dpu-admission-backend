import { sign , verify } from "jsonwebtoken";
import { hash } from "bcryptjs";
import Student from "../models/Student.js";
import Counter from "../models/Counter.js";
import getNextStudId from "../utils/generateId.js";

const student_register = async(req, res) => {
    try{
        const { 
            name,
            phoneNumber,
            email,
            dob,
            marks10,
            marks12,
            cetPercentile,
            jeePercentile,
            stream
        } = req.body

        if(!name || !phoneNumber || !email || !dob || !marks10 || !marks12 || !stream){
            return res.status(400).json({ message: "Please fill all fields !" });
        }

        if(!cetPercentile || !jeePercentile){
            return res.status(400).json({ message: "Please fill at least one percentile from cet and jee" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        const studId = getNextStudId();

        const newStudent = new Student({
            studId,
            name,
            phoneNumber,
            email,
            dob,
            marks10,
            marks12,
            cetPercentile,
            jeePercentile,
            stream
        });
        await newStudent.save();
        res.status(201).json({
            message: `Student registered with Id: ${studId}`,
            studId
        });
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
        logd(err);
    }
}

const login = async(req, res) => {
    try{
        const { studId, password } = req.body;

        if(!studId || !password){
            return res.status(400).json({ message: "Please fill all fields !" });
        }

        const student = await Student.findOne({ studId });

        if(!student){
            return res.status(404).json({
                message: `User with username ${phoneNumber} not found !`
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password !" })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        )

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch(err) {
        return res.status(500).json({ message: "Internal Server Error !" });
        console.log(err);
    }
}