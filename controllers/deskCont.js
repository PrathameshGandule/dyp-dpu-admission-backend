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
        // Destructure the fields without defaulting to empty strings.
        const {
            fatherName,
            motherName,
            gender,
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
            hscPhysics,
            hscChemistry,
            hscMaths,
            hscTotalMarks,
            hscPercentage,
            jeeYear,
            jeePercentage,
            cetYear,
            cetPercentage,
            enrollmentId,
            branch,
            campusVisit,
            cafeteriaVisit,
            sportsFacilityVisit,
            labVisit,
            classroomVisit,
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
        if (gender && gender.trim() !== "") updateFields["desk_updates.desk1.gender"] = gender;
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
        if (hscPhysics && hscPhysics.trim() !== "") updateFields["desk_updates.desk1.hscPhysics"] = hscPhysics;
        if (hscChemistry && hscChemistry.trim() !== "") updateFields["desk_updates.desk1.hscChemistry"] = hscChemistry;
        if (hscMaths && hscMaths.trim() !== "") updateFields["desk_updates.desk1.hscMaths"] = hscMaths;
        if (hscTotalMarks && hscTotalMarks.trim() !== "") updateFields["desk_updates.desk1.hscTotalMarks"] = hscTotalMarks;
        if (hscPercentage && hscPercentage.trim() !== "") updateFields["desk_updates.desk1.hscPercentage"] = hscPercentage;
        if (jeeYear && jeeYear.trim() !== "") updateFields["desk_updates.desk1.jeeYear"] = jeeYear;
        if (jeePercentage && jeePercentage.trim() !== "") updateFields["desk_updates.desk1.jeePercentage"] = jeePercentage;
        if (cetYear && cetYear.trim() !== "") updateFields["desk_updates.desk1.cetYear"] = cetYear;
        if (cetPercentage && cetPercentage.trim() !== "") updateFields["desk_updates.desk1.cetPercentage"] = cetPercentage;
        if (enrollmentId && enrollmentId.trim() !== "") updateFields["desk_updates.desk1.enrollmentId"] = enrollmentId;
        if (branch && branch.trim() !== "") updateFields["desk_updates.desk1.branch"] = branch;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk1.remarks"] = remarks;

        // For boolean values (or numbers), you may want to explicitly check for undefined,
        // because false is a valid value.
        if (typeof campusVisit !== "undefined") updateFields["desk_updates.desk1.campusVisit"] = campusVisit;
        if (typeof cafeteriaVisit !== "undefined") updateFields["desk_updates.desk1.cafeteriaVisit"] = cafeteriaVisit;
        if (typeof sportsFacilityVisit !== "undefined") updateFields["desk_updates.desk1.sportsFacilityVisit"] = sportsFacilityVisit;
        if (typeof labVisit !== "undefined") updateFields["desk_updates.desk1.labVisit"] = labVisit;
        if (typeof classroomVisit !== "undefined") updateFields["desk_updates.desk1.classroomVisit"] = classroomVisit;

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
        let { topic, remarks } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id

        let updateFields = {
            currentDesk: "desk3",
            "desk_updates.desk2.counsellorId": counsellorId,
        }

        if (topic && topic.trim() !== "") updateFields["desk_updates.desk2.topic"] = topic;
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
        const {
            admissionStatus,
            reason,
            remarks
        } = req.body ?? {};

        const studentId = req.params.id;
        const counsellorId = req.user.id;

        let updateFields = {
            currentDesk: "completed",
            "desk_updates.desk3.counsellorId": counsellorId,
        }

        if (typeof admissionStatus !== "undefined") updateFields["desk_updates.desk3.admissionStatus"] = admissionStatus;
        if (reason && reason.trim() !== "") updateFields["desk_updates.desk3.reason"] = reason;
        if (remarks && remarks.trim() !== "") updateFields["desk_updates.desk3.remarks"] = remarks;

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            { $set: updateFields },
            { new: true, projection: { _id: 1 } } // Return updated document
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