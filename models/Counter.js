import { Schema, model } from "mongoose";

const counterSchema = new Schema({
    counterId: { type: String, enum: ["eng", "mba", "phr"], default: "" },
    sequence_value: { type: Number, default: 0 }
});

export default model("Counter", counterSchema);