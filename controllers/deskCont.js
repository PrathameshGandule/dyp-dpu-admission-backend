import Student from "../models/Student.js";

const setStudent = async (req, res) => {
    try {
        const counsellorId = req.user.id;
        const current_role = String(req.user.role);
        const studentId = req.params.id;
        const stud = await Student.findById(studentId);
        if (!stud) {
            return res.status(404).json({ message: "Student not found" });
        }
        if (stud.desk_updates[current_role]?.counsellorId == counsellorId) {
            return res.status(400).json({ message: "Already assigned to you" })
        }
        if (stud.desk_updates[current_role]?.counsellorId != null) {
            return res.status(403).json({ message: "This student is being attended by another counsellor" });
        }
        stud.desk_updates[current_role].counsellorId = counsellorId;
        await stud.save();
        return res.status(200).json({ message: "Student selected" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const releaseStudent = async (req, res) => {
    try {
        const counsellorId = req.user.id;
        const current_role = String(req.user.role);
        const studentId = req.params.id;
        const stud = await Student.findById(studentId);
        if (!stud) {
            return res.status(404).json({ message: "Student not found" });
        }
        if (stud.desk_updates[current_role]?.counsellorId == null) {
            return res.status(400).json({ message: "This student is not assigned to anybody" });
        }
        if (stud.desk_updates[current_role]?.counsellorId.toString() != counsellorId) {
            return res.status(403).json({ message: "You aren't allowed to release this student" })
        }
        stud.desk_updates[current_role].counsellorId = null;
        await stud.save();
        return res.status(200).json({ message: "Student released" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getDeskNullStudents = async (req, res) => {
    try {
        const current_role = req.user.role;

        // Validate role before querying
        if (!["desk1", "desk2", "desk3"].includes(current_role)) {
            return res.status(400).json({ message: "Invalid desk role" });
        }

        const students = await Student.find({
            [`desk_updates.${current_role}.counsellorId`]: null,
            currentDesk: current_role // Ensure students belong to the correct desk
        });

        return res.status(200).json(students);
    } catch (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const current_role = req.user.role;
        let stud;
        if (current_role == "desk1") {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1 -_id");
        } else if (current_role == "desk2") {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1 desk_updates.desk2 -_id");
        } else {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1 desk_updates.desk2 desk_updates.desk3 -_id");
        }
        return res.status(200).json(stud);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk1 = async (req, res) => {
    try {
        let { marks10, marks12, remarks, cet, jee } = req.body;

        // Fix: Ensure fields are explicitly checked for null/undefined
        if (marks10 == null || marks12 == null || remarks == null || !(cet || jee)) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        // Fix: Avoid reassigning req.body variables
        // const studentEmail = String(email);
        const studentMarks10 = parseFloat(marks10);
        const studentMarks12 = parseFloat(marks12);
        const studentRemarks = String(remarks);
        cet = req.body.cet ? String(req.body.cet) : null;
        jee = req.body.jee ? String(req.body.jee) : null;

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId,
                $or: [
                    { "desk_updates.desk1.counsellorId": { $exists: false } }, // If missing, allow update
                    { "desk_updates.desk1.counsellorId": null }, // If null, allow update
                    { "desk_updates.desk1.counsellorId": counsellorId } // If already set to the correct ID, allow update
                ]
            },
            {
                $set: {
                    currentDesk: "desk2",
                    "desk_updates.desk1.marks10": studentMarks10,
                    "desk_updates.desk1.marks12": studentMarks12,
                    "desk_updates.desk1.cet": cet,
                    "desk_updates.desk1.jee": jee,
                    "desk_updates.desk1.remarks": studentRemarks,
                    "desk_updates.desk1.counsellorId": counsellorId, // Now explicitly setting it
                }
            },
            { new: true }
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


const updateDesk2 = async (req, res) => {
    try {
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
                    currentDesk: "desk3",
                    "desk_updates.desk2.campusVisit": campusVisit,
                    "desk_updates.desk2.cafeteriaVisit": cafeteriaVisit,
                    "desk_updates.desk2.sportsFacilityVisit": sportsFacilityVisit,
                    "desk_updates.desk2.labVisit": labVisit,
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
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



const updateDesk3 = async (req, res) => {
    try {
        const { topic, remarks } = req.body;
        if (!topic || !remarks) {
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
                    currentDesk: "completed",
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
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { setStudent, releaseStudent, getDeskNullStudents, getStudentById, updateDesk1, updateDesk2, updateDesk3 };