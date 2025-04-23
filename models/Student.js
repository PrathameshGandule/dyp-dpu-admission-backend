import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    studId: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    purpose: { type: String, enum: ["admission", "visit"], required: true }, // removed inquiry field
    stream: { type: String, enum: ["eng", "mba", "phr", "libart"], required: true }, // added new field liberal arts
    currentDesk: { type: String, enum: ["desk1", "desk2", "desk3", "desk4", "completed"], default: "desk1" }, // added new desk4
    visitors: { type: String, default: 0 },
    logs: [{
        entryTime: { type: Date, required: true },
        exitTime: { type: Date, default: null },
        _id: false 
    }],
    desk_updates: {
        desk1: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            fatherName: { type: String, default: "" },
            motherName: { type: String, default: "" },
            nationality: { type: String, default: "" },
            category: { type: String, default: "" },
            address: { type: String, default: "" },
            pinCode: { type: String, default: "" },
            sscBoard: { type: String, default: "" },
            sscYear: { type: String, default: "" },
            sscMarks: { type: String, default: "" },
            sscOutOf: { type: String, default: "" },
            sscPercentage: { type: String, default: "" },
            hscBoard: { type: String, default: "" },
            hscYear: { type: String, default: "" },
            hscMarks: { type: String, default: "" },
            hscOutOf: { type: String, default: "" },
            hscPercentage: { type: String, default: "" },
            jeeYear: { type: String, default: "" },
            jeePercentile: { type: String, default: "" },
            cetYear: { type: String, default: "" },
            cetPercentile: { type: String, default: "" },
            enrollmentId: { type: String, default: "EN24" },
            branch: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk2: {
            campusVisit: { type: Boolean, default: false },
            cafeteriaVisit: { type: Boolean, default: false },
            sportsFacilityVisit: { type: Boolean, default: false },
            labVisit: { type: Boolean, default: false },
            classroomVisit: { type: Boolean, default: false },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk3: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            topic: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk4: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            admissionStatus: { type: Boolean, default: false },
            reason: { type: String, default: "" },
            remarks: { type: String, default: "No remarks currently" }
        }
    }
}, { timestamps: true });

export default model("Student", studentSchema);