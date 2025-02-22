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

export const updateProfile = async (req, res) => {
    try {

        const {username, image} = req.body;

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.username = username || user.username;
        user.profilePicture = profilePicture || user.profilePicture;

        await user.save();
        res.json({ message: "Profile updated successfully" });
        
    } catch (error) {
        console.log("Error in updateProfile",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};