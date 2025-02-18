import { Schema, model } from "mongoose";

const counsellorSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    allotedStudents: [
        { type: Schema.Types.ObjectId, ref: "Student" }
    ],
}, { timestamps: true });

export default model("Counsellor", counsellorSchema);