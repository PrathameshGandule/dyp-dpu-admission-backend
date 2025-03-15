import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    studId: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "transgender"], default: "male" },
    purpose: { type: String, enum: ["admission", "inquiry", "visit"], required: true },
    stream: { type: String, enum: ["eng", "mba", "phr"], required: true },
    currentDesk: { type: String, enum: ["desk1", "desk2", "desk3", "completed"], default: "desk1" },
    visitors: { type: String, default: 0 },
    logs: [{
        entryTime: { type: Date, required: true },
        exitTime: { type: Date, default: null }    
    }],
    desk_updates: {
        desk1: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            // studentName: { type: String, default: "" },
            fatherName: { type: String, default: "" },
            motherName: { type: String, default: "" },
            // gender: { type: String, enum: ["male", "female", "transgender"], default: "male" },
            nationality: { type: String, default: "" },
            category: { type: String, default: "" },
            // email: { type: String, default: "" },
            // phone: { type: String, default: "", unique: true },
            address: { type: String, default: "" },
            pinCode: { type: String, default: "" },
            sscBoard: { type: String, default: "" },
            sscYear: { type: String, default: "" },
            sscMarks: { type: String, default: "" },
            sscOutOf: { type: String, default: "" },
            sscPercentage: { type: String, default: "" },
            hscBoard: { type: String, default: "" },
            hscYear: { type: String, default: "" },
            hscPhysics: { type: String, default: "" },
            hscChemistry: { type: String, default: "" },
            hscMaths: { type: String, default: "" },
            hscTotalMarks: { type: String, default: "" },
            hscPercentage: { type: String, default: "" },
            jeeYear: { type: String, default: "" },
            jeePercentage: { type: String, default: "" },
            cetYear: { type: String, default: "" },
            cetPercentage: { type: String, default: "" },
            enrollmentId: { type: String, default: "EN24" },
            branch: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" },
            campusVisit: { type: Boolean, default: false },
            cafeteriaVisit: { type: Boolean, default: false },
            sportsFacilityVisit: { type: Boolean, default: false },
            labVisit: { type: Boolean, default: false },
            classroomVisit: { type: Boolean, default: false },
        },
        desk2: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            topic: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk3: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            admissionStatus: { type: Boolean, default: false },
            reason: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" }
        }
    }
}, { timestamps: true });

export default model("Student", studentSchema);