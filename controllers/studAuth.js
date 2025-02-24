import Student from "../models/Student.js";
import getNextStudId from "../utils/generateId.js";

const gate_form = async(req, res) => {
    try{
        const { firstname, middlename, lastname, phone, purpose, stream } = req.body;
        if(!firstname || !middlename || !lastname || !phone || !purpose || !stream){
            return res.status(404).json({ message: "Fill all fields !" });
        }
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
        return res.status(200).json({ message: "Student registered successfully !" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { gate_form };