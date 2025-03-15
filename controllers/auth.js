import jpkg from "jsonwebtoken";
import bpkg from "bcryptjs";
import CollegeAuthority from "../models/CollegeAuthority.js";

const { sign, verify } = jpkg;
const { hash , compare } = bpkg;

const auth_register = async(req, res) => {
    try{
        const { username, password , type } = req.body;
        if(!username || !password || !type){
            return res.status(400).json({ message: "Fill all fields !" });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = new CollegeAuthority({
            username, 
            password: hashedPassword,
            type
        });
        await newUser.save();
        return res.status(200).json({ message: `Registration with username: ${username} and type ${type} successful !` });
    } catch(err) {
        logd(err);        
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const auth_login = async(req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Fill all fields !" });
        }

        const user = await CollegeAuthority.findOne({ username });
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

        res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "Strict",
            maxAge: 18 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successfull", role: user.type });
    } catch(err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// use this whoami route to check what is role in current token
const whoami = (req ,res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ role: decoded.role });
    } catch (err) {
       console.error(err)
        return res.status(403).json({ message: "Forbidden" });
    }
}

export {
    auth_register,
    auth_login,
    whoami
};