import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -otp -otpExpires");;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log("Error in getProfile",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
