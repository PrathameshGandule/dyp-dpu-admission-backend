import jpkg from "jsonwebtoken";
import bpkg from "bcryptjs";
import GateRegistration from "../models/GateRegistration.js";

const { sign } = jpkg;
const { hash , compare } = bpkg;

const gate_auth_register = async(req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Fill all fields !" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = new GateRegistration({
            username, 
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: `Registration with username: ${username} successful !` });
    } catch(err) {
        logd(err);        
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const gate_auth_login = async(req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Fill all fields !" });
        }

        const user = await GateRegistration.findOne({ username });
        if(!user){
            return res.status(404).json({ message: `User with username: ${username} not found !` });
        }

        const isMatch = await compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Password !" });
        }

        const token = sign(
            { id: user._id, role: "gate" },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 18 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successfull" });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    gate_auth_register,
    gate_auth_login
};