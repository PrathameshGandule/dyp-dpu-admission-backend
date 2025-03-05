import Student from "../models/Student.js";

// const setStudent = async (req, res) => {
//     try {
//         const counsellorId = req.user.id;
//         const current_role = String(req.user.role);
//         const studentId = req.params.id;
//         const stud = await Student.findById(studentId);
//         if (!stud) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         if (stud.desk_updates[current_role]?.counsellorId == counsellorId) {
//             return res.status(400).json({ message: "Already assigned to you" })
//         }
//         if (stud.desk_updates[current_role]?.counsellorId != null) {
//             return res.status(403).json({ message: "This student is being attended by another counsellor" });
//         }
//         stud.desk_updates[current_role].counsellorId = counsellorId;
//         await stud.save();
//         return res.status(200).json({ message: "Student selected" });
//     } catch (err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const releaseStudent = async (req, res) => {
//     try {
//         const counsellorId = req.user.id;
//         const current_role = String(req.user.role);
//         const studentId = req.params.id;
//         const stud = await Student.findById(studentId);
//         if (!stud) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         if (stud.desk_updates[current_role]?.counsellorId == null) {
//             return res.status(400).json({ message: "This student is not assigned to anybody" });
//         }
//         if (stud.desk_updates[current_role]?.counsellorId.toString() != counsellorId) {
//             return res.status(403).json({ message: "You aren't allowed to release this student" })
//         }
//         stud.desk_updates[current_role].counsellorId = null;
//         await stud.save();
//         return res.status(200).json({ message: "Student released" });
//     } catch (err) {
//         logd(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

const getDeskNullStudents = async (req, res) => {
    try {
        const current_role = req.user.role;
        let null_students_field_path = `desk_updates.${current_role}.counsellorId`;
        const students = await Student.find({ [null_students_field_path]: null });
        return res.status(200).json(students);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const current_role = req.user.role;
        let stud;
        if (current_role == "desk1") {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1");
        } else if (current_role == "desk2") {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1 desk_updates.desk2");
        } else {
            stud = await Student.findById(studentId).select("studId firstname middlename lastname phone email purpose stream desk_updates.desk1 desk_updates.desk2 desk_updates.desk3");
        }
        return res.status(200).json(stud);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk1 = async (req, res) => {
    try {
        let {
            fatherName = "",
            motherName = "",
            gender = "",
            nationality = "",
            category = "",
            address = "",
            pinCode = "",
            sscBoard = "",
            sscYear = "",
            sscMarks = "",
            sscOutOf = "",
            sscPercentage = "",
            hscBoard = "",
            hscYear = "",
            hscPhysics = "",
            hscChemistry = "",
            hscMaths = "",
            hscTotalMarks = "",
            hscPercentage = "",
            jeeYear = "",
            jeePercentage = "",
            cetYear = "",
            cetPercentage = "",
            enrollmentId = "",
            branch = "",
            campusVisit = false,
            cafeteriaVisit = false,
            sportsFacilityVisit = false,
            labVisit = false,
            classroomVisit = false,
            remarks = "",
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId
            },
            {
                $set: {
                    currentDesk: "desk2",
                    "desk_updates.desk1.counsellorId": counsellorId,
                    "desk_updates.desk1.fatherName": fatherName,
                    "desk_updates.desk1.motherName": motherName,
                    "desk_updates.desk1.gender": gender,
                    "desk_updates.desk1.nationality": nationality,
                    "desk_updates.desk1.category": category,
                    "desk_updates.desk1.address": address,
                    "desk_updates.desk1.pinCode": pinCode,
                    "desk_updates.desk1.sscBoard": sscBoard,
                    "desk_updates.desk1.sscYear": sscYear,
                    "desk_updates.desk1.sscMarks": sscMarks,
                    "desk_updates.desk1.sscOutOf": sscOutOf,
                    "desk_updates.desk1.sscPercentage": sscPercentage,
                    "desk_updates.desk1.hscBoard": hscBoard,
                    "desk_updates.desk1.hscYear": hscYear,
                    "desk_updates.desk1.hscPhysics": hscPhysics,
                    "desk_updates.desk1.hscChemistry": hscChemistry,
                    "desk_updates.desk1.hscMaths": hscMaths,
                    "desk_updates.desk1.hscTotalMarks": hscTotalMarks,
                    "desk_updates.desk1.hscPercentage": hscPercentage,
                    "desk_updates.desk1.jeeYear": jeeYear,
                    "desk_updates.desk1.jeePercentage": jeePercentage,
                    "desk_updates.desk1.cetYear": cetYear,
                    "desk_updates.desk1.cetPercentage": cetPercentage,
                    "desk_updates.desk1.enrollmentId": enrollmentId,
                    "desk_updates.desk1.branch": branch,
                    "desk_updates.desk1.campusVisit": campusVisit,
                    "desk_updates.desk1.cafeteriaVisit": cafeteriaVisit,
                    "desk_updates.desk1.sportsFacilityVisit": sportsFacilityVisit,
                    "desk_updates.desk1.labVisit": labVisit,
                    "desk_updates.desk1.classroomVisit": classroomVisit,
                    "desk_updates.desk1.remarks": remarks,
                }
            },
            { new: true, projection: { _id: 1 } } // Return updated document
        );

        // Fix: Return 404 instead of 403 for missing student
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Desk1 info updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateDesk2 = async (req, res) => {
    try {
        let { topic = "", remarks = "" } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id
        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId
            },
            {
                $set: {
                    currentDesk: "desk3",
                    "desk_updates.desk2.counsellorId": counsellorId,
                    "desk_updates.desk2.topic": topic,
                    "desk_updates.desk2.remarks": remarks
                }
            },
            { new: true, projection: { _id: 1 } } // Return updated document
        );
        if (!updatedStudent) {
            return res.status(403).json({ message: "This student does not exist" });
        }
        return res.status(200).json({ message: "Desk2 info updated successfully" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



const updateDesk3 = async (req, res) => {
    try {
        const {
            admissionStatus = false,
            reason = "",
            remarks = "" 
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId
            },
            {
                $set: {
                    currentDesk: "completed",
                    "desk_updates.desk3.counsellorId": counsellorId,
                    "desk_updates.desk3.admissionStatus": admissionStatus,
                    "desk_updates.desk3.reason": reason,
                    "desk_updates.desk3.remarks": remarks,
                }
            }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "This student does not exist" });
        }
        return res.status(200).json({ message: "Desk3 info updated successfully" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getDeskNullStudents, getStudentById, updateDesk1, updateDesk2, updateDesk3 };