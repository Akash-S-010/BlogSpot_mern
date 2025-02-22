import express from "express";
const router = express.Router();
import  checkAuth  from "../middlewares/checkAuth.js";
import { getProfile, updateProfile } from "../controllers/userController.js";


router.get("/profile/:id", checkAuth, getProfile);

router.put("/profile/:id", checkAuth, updateProfile);

export default router;

