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

        // Validate role before querying
        if (!["desk1", "desk2", "desk3", "desk4"].includes(current_role)) {
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
            stud = await Student.findById(studentId).select("studId firstname lastname phone email purpose stream gender");
        } else if (current_role == "desk2") {
            stud = await Student.findById(studentId).select("desk_updates.desk1.remarks");
        } else if (current_role == "desk3") {
            stud = await Student.findById(studentId).select("desk_updates.desk1.remarks desk_updates.desk2.remarks");
        } else {
            stud = await Student.findById(studentId).lean();
        }
        return res.status(200).json(stud);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

function isValidDateString(dateStr) {
    if (dateStr.length !== 7) return false;
    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(2, 5);
    const year = dateStr.slice(5, 7);
    const validMonths = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const dayNum = Number(day);
    const yearNum = Number(year);
    if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > 31) { return false }
    if (!validMonths.includes(month)) { return false }
    if (Number.isNaN(yearNum)) { return false }
    return true;
}


const getStudentsFromDate = async (req, res) => {
    try {
        const dateString = req.params.date;
        if (!isValidDateString(dateString)) {
            return res.status(400).json({ message: "Invalid date" });
        }
        const students = await Student.find({
            studId: { $regex: dateString }
        }).select("firstname lastname studId stream").lean().exec();
        return res.status(200).json(students);
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk1 = async (req, res) => {
    try {
        // Destructure the fields without defaulting to empty strings.
        const {
            fatherName,
            motherName,
            nationality,
            category,
            address,
            pinCode,
            sscBoard,
            sscYear,
            sscMarks,
            sscOutOf,
            sscPercentage,
            hscBoard,
            hscYear,
            hscMarks,
            hscOutOf,
            hscPercentage,
            jeeYear,
            jeePercentile,
            cetYear,
            cetPercentile,
            enrollmentId,
            branch,
            remarks,
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        // Build the update object with fixed fields.
        let updateFields = {
            currentDesk: "desk2",
            "desk_updates.desk1.counsellorId": counsellorId,
        };

        // Dynamically add only non-empty string fields.
        if (fatherName && fatherName.trim() !== "") updateFields["desk_updates.desk1.fatherName"] = fatherName;
        if (motherName && motherName.trim() !== "") updateFields["desk_updates.desk1.motherName"] = motherName;
        if (nationality && nationality.trim() !== "") updateFields["desk_updates.desk1.nationality"] = nationality;
        if (category && category.trim() !== "") updateFields["desk_updates.desk1.category"] = category;
        if (address && address.trim() !== "") updateFields["desk_updates.desk1.address"] = address;
        if (pinCode && pinCode.trim() !== "") updateFields["desk_updates.desk1.pinCode"] = pinCode;
        if (sscBoard && sscBoard.trim() !== "") updateFields["desk_updates.desk1.sscBoard"] = sscBoard;
        if (sscYear && sscYear.trim() !== "") updateFields["desk_updates.desk1.sscYear"] = sscYear;
        if (sscMarks && sscMarks.trim() !== "") updateFields["desk_updates.desk1.sscMarks"] = sscMarks;
        if (sscOutOf && sscOutOf.trim() !== "") updateFields["desk_updates.desk1.sscOutOf"] = sscOutOf;
        if (sscPercentage && sscPercentage.trim() !== "") updateFields["desk_updates.desk1.sscPercentage"] = sscPercentage;
        if (hscBoard && hscBoard.trim() !== "") updateFields["desk_updates.desk1.hscBoard"] = hscBoard;
        if (hscYear && hscYear.trim() !== "") updateFields["desk_updates.desk1.hscYear"] = hscYear;
        if (hscMarks && hscMarks.trim() !== "") updateFields["desk_updates.desk1.hscMarks"] = hscMarks;
        if (hscOutOf && hscOutOf.trim() !== "") updateFields["desk_updates.desk1.hscOutOf"] = hscOutOf;
        if (hscPercentage && hscPercentage.trim() !== "") updateFields["desk_updates.desk1.hscPercentage"] = hscPercentage;
        if (jeeYear && jeeYear.trim() !== "") updateFields["desk_updates.desk1.jeeYear"] = jeeYear;
        if (jeePercentile && jeePercentile.trim() !== "") updateFields["desk_updates.desk1.jeePercentile"] = jeePercentile;
        if (cetYear && cetYear.trim() !== "") updateFields["desk_updates.desk1.cetYear"] = cetYear;
        if (cetPercentile && cetPercentile.trim() !== "") updateFields["desk_updates.desk1.cetPercentile"] = cetPercentile;
        if (enrollmentId && enrollmentId.trim() !== "") updateFields["desk_updates.desk1.enrollmentId"] = enrollmentId;
        if (branch && branch.trim() !== "") updateFields["desk_updates.desk1.branch"] = branch;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk1.remarks"] = remarks;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            { $set: updateFields },
            { new: true, projection: { _id: 1 } } // Return updated document
        );

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
        let {
            campusVisit,
            cafeteriaVisit,
            sportsFacilityVisit,
            labVisit,
            classroomVisit,
            remarks
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id

        let updateFields = {
            currentDesk: "desk3",
            "desk_updates.desk2.counsellorId": counsellorId,
        }

        if (typeof campusVisit !== "undefined") updateFields["desk_updates.desk2.campusVisit"] = campusVisit;
        if (typeof cafeteriaVisit !== "undefined") updateFields["desk_updates.desk2.cafeteriaVisit"] = cafeteriaVisit;
        if (typeof sportsFacilityVisit !== "undefined") updateFields["desk_updates.desk2.sportsFacilityVisit"] = sportsFacilityVisit;
        if (typeof labVisit !== "undefined") updateFields["desk_updates.desk2.labVisit"] = labVisit;
        if (typeof classroomVisit !== "undefined") updateFields["desk_updates.desk2.classroomVisit"] = classroomVisit;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk2.remarks"] = remarks;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            { $set: updateFields },
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
        let { topic, remarks } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id

        let updateFields = {
            currentDesk: "desk4",
            "desk_updates.desk3.counsellorId": counsellorId,
        }

        if (topic && topic.trim() !== "") updateFields["desk_updates.desk3.topic"] = topic;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk3.remarks"] = remarks;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            { $set: updateFields },
            { new: true, projection: { _id: 1 } } // Return updated document
        );
        if (!updatedStudent) {
            return res.status(403).json({ message: "This student does not exist" });
        }
        return res.status(200).json({ message: "Desk3 info updated successfully" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateDesk4 = async (req, res) => {
    try {
        const {
            admissionStatus,
            reason,
            remarks
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        let updateFields = {
            currentDesk: "completed",
            "desk_updates.desk4.counsellorId": counsellorId,
        }

        if (typeof admissionStatus !== "undefined") updateFields["desk_updates.desk4.admissionStatus"] = admissionStatus;
        if (reason && reason.trim() !== "") updateFields["desk_updates.desk4.reason"] = reason;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk4.remarks"] = remarks;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            { $set: updateFields },
            { new: true, projection: { _id: 1 } } // Return updated document
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "This student does not exist" });
        }
        return res.status(200).json({ message: "Desk4 info updated successfully" });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { 
    getDeskNullStudents, 
    getStudentById, 
    getStudentsFromDate,
    updateDesk1, 
    updateDesk2, 
    updateDesk3, 
    updateDesk4
};