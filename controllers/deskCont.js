import Student from "../models/Student.js";
import Counsellor from "../models/Counsellor.js";

const setStudent = async (req, res) => {
    try{
        const counsellorId = req.user.id;
        const current_role = String(req.user.role);
        const studentId = req.params.id;
        const stud = await Student.findById(studentId);
        if(stud.desk_updates[current_role]?.counsellorId.toString() == counsellorId){
            return res.status(400).json({ message: "Already assigned to you" })
        }
        if(stud.desk_updates[current_role]?.counsellorId != null){
            return res.status(403).json({ message: "This student is being attended by another counsellor" });
        }
        stud.desk_updates[current_role].counsellorId = counsellorId;
        await stud.save();
        return res.status(200).json({ message: "Student selected" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const releaseStudent = async(req, res) => {
    try{
        const counsellorId = req.user.id;
        const current_role = String(req.user.role);
        const studentId = req.params.id;
        const stud = await Student.findById(studentId);
        if(stud.desk_updates[current_role]?.counsellorId == null){
            return res.status(400).json({ message: "This student is not assigned to anybody" });
        }
        if(stud.desk_updates[current_role]?.counsellorId.toString() != counsellorId){
            return res.status(403).json({ message: "You aren't allowed to release him/her" })
        }
        stud.desk_updates[current_role].counsellorId = null;
        await stud.save();
        return res.status(200).json({ message: "Student released" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk1 = async (req, res) => {
    try {
        const { email, marks10, marks12, remarks } = req.body;

        // Fix: Ensure fields are explicitly checked for null/undefined
        if (email == null || marks10 == null || marks12 == null || remarks == null) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        // Fix: Avoid reassigning req.body variables
        const studentEmail = String(email);
        const studentMarks10 = parseFloat(marks10);
        const studentMarks12 = parseFloat(marks12);
        const studentRemarks = String(remarks);
        const cet = req.body.cet ? String(req.body.cet) : null;
        const jee = req.body.jee ? String(req.body.jee) : null;

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId,
                "desk_updates.desk1.counsellorId": counsellorId, // Ensures only the right counsellor updates
            },
            {
                $set: {
                    "desk_updates.desk1.email": studentEmail,
                    "desk_updates.desk1.marks10": studentMarks10,
                    "desk_updates.desk1.marks12": studentMarks12,
                    "desk_updates.desk1.cet": cet,
                    "desk_updates.desk1.jee": jee,
                    "desk_updates.desk1.remarks": studentRemarks,
                }
            },
            { new: true } // Return updated document
        );

        // Fix: Return 404 instead of 403 for missing student
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found or being attended by another counsellor" });
        }

        return res.status(200).json({ message: "Desk1 info updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


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



const updateDesk3 = async(req, res) => {
    try{
        const { topic, remarks } = req.body;
        if(!topic || !remarks){
            return res.status(400).json({ message: "Please fill all required fields" });
        }
    
        const studentId = req.params.id;
        const counsellorId = req.user.id;   
        
        const updatedStudent = await Student.findOneAndUpdate(
        {
            _id: studentId,
            "desk_updates.desk3.counsellorId": counsellorId,
        },
        {
            $set: {
                "desk_updates.desk3.counsellorId": counsellorId,
                "desk_updates.desk3.topic": topic,
                "desk_updates.desk3.remarks": remarks,
            }
        }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "This student is being attended by another counsellor or does not exist" });
        }
        return res.status(200).json({ message: "Desk3 info updated successfully" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { setStudent , releaseStudent , updateDesk1 , updateDesk2 , updateDesk3 };