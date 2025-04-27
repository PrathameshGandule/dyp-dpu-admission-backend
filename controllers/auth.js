import jpkg from "jsonwebtoken";
import bpkg from "bcryptjs";
import { sendRegistrationMail } from "../utils/mailSender.js";
import CollegeAuthority from "../models/CollegeAuthority.js";

const { sign } = jpkg;
const { hash, compare } = bpkg;

const auth_register = async (req, res) => {
    try {
        const { name, email, type } = req.body;
        if (!name || !email || !type) {
            return res.status(400).json({ message: "Fill all fields !" });
        }
        const allowedTypes = ["gate", "desk1", "desk2", "desk3", "desk4"];
        if(!allowedTypes.includes(type)){
            return res.status(400).json({ message: "Invalid registration type" });
        }
        const existing = await CollegeAuthority.findOne({ email });
        if(existing){
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const newUser = new CollegeAuthority({
            name,
            email,
            type
        });
        await newUser.save();
        await sendRegistrationMail(name, email, type);
        return res.status(200).json({ message: `Registration with email ${email} and type ${type} successfull !` });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const auth_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fill all fields !" });
        }

        const user = await CollegeAuthority.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found !` });
        }
        if(user.isPasswordSet != true){
            return res.status(400).json({ message: "Set your new password first" });
        }
        if (user.isLoginAllowed != true) {
            return res.status(400).json({ message: "You are not allowed to login" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password !" });
        }

        const token = sign(
            { id: user._id, role: user.type },
            process.env.JWT_SECRET,
            { expiresIn: "18h" }
        );

        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 18 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successfull", role: user.type });
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// use this whoami route to check what is role in current token
const whoami = (req, res) => {
    try {
        // const token = req.cookies.token;
        // if (!token) {
        //     return res.status(401).json({ message: "No token provided" });
        // }
        // const decoded = verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ role: req.user.role });
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: "Forbidden" });
    }
}

const denyLogin = async (req, res) => {
    try {
        const clgauthId = req.params.id;
        if (clgauthId == req.user.id) {
            return res.status(400).json({ message: "Can't blacklist yourselves" });
        }
        const user = await CollegeAuthority.findOne({ _id: clgauthId });
        if (!user) {
            return res.status(404).json({ message: `Person not found !` });
        }
        if (user.isLoginAllowed == false) {
            return res.status(400).json({ message: "Person already blacklisted" });
        }
        user.isLoginAllowed = false;
        await user.save();
        return res.status(200).json({ message: "Person blacklisted successfully", email: user.email });
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: "Forbidden" });
    }
}

const allowLogin = async (req, res) => {
    try {
        const clgauthId = req.params.id;
        if (clgauthId == req.user.id) {
            return res.status(400).json({ message: "Can't whitelist yourselves" });
        }
        const user = await CollegeAuthority.findOne({ _id: clgauthId });
        if (!user) {
            return res.status(404).json({ message: `Person not found !` });
        }
        if (user.isLoginAllowed == true) {
            return res.status(400).json({ message: "Person already whitelisted" });
        }
        user.isLoginAllowed = true;
        await user.save();
        return res.status(200).json({ message: "Person whitelisted successfully", email: user.email });
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: "Forbidden" });
    }
}

const getAllCollegeAuthorities = async (req, res) => {
    try {
        const users = await CollegeAuthority.find();
        return res.status(200).json(users);
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: "Forbidden" });
    }
}

// Route: POST /api/logout
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({ message: "Logout successful" });
};


export {
    auth_register,
    auth_login,
    denyLogin,
    allowLogin,
    getAllCollegeAuthorities,
    whoami,
    logout
};