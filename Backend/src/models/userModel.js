import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String

  },
  profilePic: {
    type: String,
    default: ""
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
},
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
