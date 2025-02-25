import jpkg from "jsonwebtoken";
import bpkg from "bcryptjs";
import Counsellor from "../models/Counsellor.js"
import cookieParser from "cookie-parser";

const { sign } = jpkg;
const { hash , compare } = bpkg;

const desk_auth_register = async(req, res) => {
    try{
        const { username, password , type } = req.body;
        if(!username || !password || !type){
            return res.status(400).json({ message: "Fill all fields !" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = new Counsellor({
            username, 
            password: hashedPassword,
            type
        });
        await newUser.save();
        return res.status(200).json({ message: `Registration with username: ${username} and ${type} successful !` });
    } catch(err) {
        logd(err);        
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const desk_auth_login = async(req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Fill all fields !" });
        }

        const user = await Counsellor.findOne({ username });
        if(!user){
            return res.status(404).json({ message: `User with username: ${username} not found !` });
        }

        const isMatch = await compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Password !" });
        }

        const token = sign(
            { id: user._id, role: user.type },
            process.env.JWT_SECRET,
            { expiresIn: "18h" }
        );

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "Strict",
        //     maxAge: 18 * 60 * 60 * 1000
        // });

        res.status(200).json({
            message: "Login successfull",
            token
        });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    desk_auth_register,
    desk_auth_login
};