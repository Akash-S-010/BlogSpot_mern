import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


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
        await sendEmail(email, "BlogSpot", `Your OTP for registration: ${otp}`);

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
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate access token with 7-day lifespan
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_SECRET, {expiresIn: "7d"});

        // Set access token in cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        res.status(200).json({ 
            message: "Login successful",
            user: { _id: user._id, username: user.username, email: user.email } 
        });


    } catch (error) {
        console.log("Error in logging in user", error); 
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ------------Get user------------
export const getUser = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.status(401).json({ message: "Unauthorized" });

        jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            const user = await User.findById(decoded.userId).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });

            res.status(200).json({ user });
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// ------------User logout------------
export const logout = async (req, res) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });
    
    return res.json({ message: "User logged out successfully" });
};


