import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


// --------User registration with OTP--------
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        if (!user) {
            user = new User({ username, email, password: hashedPassword, otp, otpExpires: Date.now() + 5 * 60 * 1000 });
        } else {
            user.password = hashedPassword;
            user.otp = otp;
            user.otpExpires = Date.now() + 5 * 60 * 1000;
        }

        await user.save();

        // Send OTP via email
        await sendEmail(email, "Your OTP Code", `Your OTP for registration: ${otp}`);

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });
    } catch (err) {
        console.log("Error in registering user", err);
        res.status(500).json({ message: "Internal server error"});
    }
};


// ------------OTP verification------------
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP verified, finalize registration
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Registration successful. You can now log in." });
    } catch (err) {
        console.log("Error in verifying OTP", err);
        res.status(500).json({ message: "Internal server error"});
    }
};



// ------------User login------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // generate tokens
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "5m"});
        const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "Login successful" });


    } catch (error) {
        console.log("Error in logging in user", error); 
        return res.status(500).json({ message: "Internal server error" });
    }
};



// ------------User logout------------
export const logout = async (req, res) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });
    
    return res.json({ message: "User logged out successfully" });
};


