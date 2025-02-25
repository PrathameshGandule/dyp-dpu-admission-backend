import Student from "../models/Student.js";
import getNextStudId from "../utils/generateId.js";

const gate_form = async(req, res) => {
    try{
        const { firstname, middlename, lastname, phone, purpose, stream } = req.body;
        if(!firstname || !middlename || !lastname || !phone || !purpose || !stream){
            return res.status(400).json({ message: "Fill all required fields !" });
        }
        const doesStudentExist = await Student.findOne({ phone });
        if(doesStudentExist){
            return res.status(400).json({ message: `Student with phone number ${phone} already exists` });
        };
        const studId = await getNextStudId();
        const newStudent = new Student({
            studId,
            firstname,
            middlename,
            lastname,
            phone,
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