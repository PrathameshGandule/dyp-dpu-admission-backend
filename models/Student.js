import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    credentials10: {
        boardName: { type: String, required: true },
        marks: { type: Number, required: true },
    },
    credentials12: {
        boardName: { type: String, required: true },
        marks: { type: Number, required: true },
    },
    cetPercentile: { type: Number },
    jeePercentile: { type: Number },
    stream: { type: String, enum: ["comp", "mech", "civil", "instru", "electrical", "entc", "anr", 'it'], required: true },
    allotedCounsellor: { type: Schema.Types.ObjectId, ref: "Counsellor" },
}, { timestamps: true });

export default model("Student", studentSchema);