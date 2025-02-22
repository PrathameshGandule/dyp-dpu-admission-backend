import { Schema, model } from "mongoose";

const counterSchema = new Schema({
    sequence_value: { type: Number, default: 0 }
});

export default model("Counter", counterSchema);