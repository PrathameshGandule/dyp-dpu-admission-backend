import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    studId: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    purpose: { type: String, enum: ["admission", "inquiry", "visit"] , required: true },
    stream: { type: String, enum: ["eng", "mba", "pharma"], required: true },
    desk_updates: {
        desk1: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            marks10: { type: Number, default: null },
            marks12: { type: Number, default: null },
            cet: { type: Number, default: null },
            jee: { type: Number, default: null },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk2: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            campusVisit: { type: Boolean, default: false },
            cafeteriaVisit: { type: Boolean, default: false },
            sportsFacilityVisit: { type: Boolean, default: false },
            labVisit: { type: Boolean, default: false },
            classroomVisit: { type: Boolean, default: false },
            remarks: { type: String, default: "No remarks currently" }
        },
        desk3: {
            counsellorId: { type: Schema.Types.ObjectId, ref: "Counsellor", default: null },
            topic: { type: String, default: "None" },
            remarks: { type: String, default: "No remarks currently" }
        }
    }
}, { timestamps: true });

export default model("Student", studentSchema);