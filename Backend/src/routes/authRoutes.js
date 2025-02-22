import express from "express";
const router = express.Router();
import { getUser, login, logout, register, verifyOtp } from "../controllers/authController.js";



router.post("/register", register);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

router.post("/login", logout);

router.get("/me", getUser);



export default router;
