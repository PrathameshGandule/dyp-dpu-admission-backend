import Student from "../models/Student.js";
import Counsellor from "../models/Counsellor.js";

const setStudent = async (req, res) => {
    try{
        const counsellorId = req.user.id;
        const currrole = String(req.user.role);
        if(!req.params.id){
            return res.status(404).json({ message: "Please student Id in params" });
        }
        const studentId = req.params.id;
        const stud = await Student.findById(studentId);
        if(stud.desk_updates[currrole]?.counsellorId != null){
            return res.status(404).json({ message: "This student is being attended by another counsellor" });
        }
        stud.desk_updates[currrole].counsellorId = counsellorId;
        await stud.save();
        return res.status(200).json({ message: "Student selected" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk1 = async (req, res) => {
    try{
        let { email, marks10, marks12, remarks } = req.body;
        if(!email || !marks10 || !marks12 || !remarks){
            return res.status(404).json({ message: "PLease fill required fields" });
        }
        email = String(email);
        marks10 = parseFloat(marks10);
        marks12 = parseFloat(marks12);
        remarks = String(remarks);
        const cet = req.body.cet ? String(req.body.cet) : null;
        const jee = req.body.jee ? String(req.body.jee) : null;
        
        const studentId = req.params.id;
        const existingCounsellorId = await Student.findById(studentId, 'desk_updates.desk1.counsellorId -_id');
        if(existingCounsellorId === null){
            return res.status(400).json({ message: "Select the student first" });
        }
        const counsellorId = req.user.id;
        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId,
                "desk_updates.desk1.counsellorId": counsellorId,
            },
            {
                $set: {
                    "desk_updates.desk1.email": email,
                    "desk_updates.desk1.marks10": marks10,
                    "desk_updates.desk1.marks12": marks12,
                    "desk_updates.desk1.cet": cet,
                    "desk_updates.desk1.jee": jee,
                    "desk_updates.desk1.remarks": remarks,
                }
            },
            { new: true } // Return updated document
        );
        
        if (!updatedStudent) {
            return res.status(403).json({ message: "This student is being attended by another counsellor or does not exist" });
        }
        return res.status(200).json({ message: "Desk1 info updated successfully" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk2 = async(req, res) => {
    try{
        const campusVisit = Boolean(req.body.campusVisit || false);
        const cafeteriaVisit = Boolean(req.body.cafeteriaVisit || false)
        const sportsFacilityVisit = Boolean(req.body.sportsFacilityVisit || false);
        const labVisit = Boolean(req.body.labVisit || false);
        const classroomVisit = Boolean(req.body.classroomVisit || false);
        const remarks = String(req.body.remarks || "no remarks currently")

        const studentId = req.params.id;
        const counsellorId = req.user.id
        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId,
                "desk_updates.desk2.counsellorId": counsellorId,
            },
            {
                $set: {
                    "desk_updates.desk2.campusVisit": campusVisit,
                    "desk_updates.desk2.cafeteriaVisit": cafeteriaVisit,
                    "desk_updates.desk2.sportsFacilityVisit": sportsFacilityVisit,
                    "desk_updates.desk2.labVisit":labVisit,
                    "desk_updates.desk2.classroomVisit": classroomVisit,
                    "desk_updates.desk2.remarks": remarks,
                }
            },
            { new: true } // Return updated document
        );
        if (!updatedStudent) {
            return res.status(403).json({ message: "This student is being attended by another counsellor or does not exist" });
        }
        return res.status(200).json({ message: "Desk2 info updated successfully" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk3 = async(req, res) => {}

export { setStudent , updateDesk1 , updateDesk2 };