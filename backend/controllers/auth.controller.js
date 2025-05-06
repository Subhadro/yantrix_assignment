import { generateCookie } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateCookie(user._id, res);
        console.log("you are logged in")
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Error in login controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        console.log("Logged out successfully");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({ message: "Logout failed" });
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
        console.log("password must be at least 6 characters");
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        generateCookie(newUser._id, res);
        console.log("you are signed up")
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.error("Auth check error ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
