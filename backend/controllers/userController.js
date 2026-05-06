import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../models/userModel.js";

const TOKEN_EXPIRY = "7d";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email?.toLowerCase()?.trim() });
        if (!user) return res.json({ success: false, message: "No account found with this email" });
        if (!user.isActive) return res.json({ success: false, message: "Account suspended. Contact support." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

        await userModel.findByIdAndUpdate(user._id, {
            lastLogin: new Date(),
            $inc: { loginCount: 1 }
        });

        const token = createToken(user._id);
        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error("loginUser:", error);
        res.json({ success: false, message: "Something went wrong. Try again." });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name?.trim()) return res.json({ success: false, message: "Name is required" });
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Enter a valid email address" });
        if (password.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });

        const exists = await userModel.findOne({ email: email.toLowerCase().trim() });
        if (exists) return res.json({ success: false, message: "An account with this email already exists" });

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            lastLogin: new Date(),
            loginCount: 1,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error("registerUser:", error);
        res.json({ success: false, message: "Registration failed. Try again." });
    }
};

export { loginUser, registerUser };
