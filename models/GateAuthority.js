import { Schema, model } from "mongoose";

const gateAuthoritySchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default model("GateAuthority", gateAuthoritySchema);