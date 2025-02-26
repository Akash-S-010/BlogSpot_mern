import express from "express";
const router = express.Router();
import  checkAuth  from "../middlewares/checkAuth.js";
import { getProfile } from "../controllers/userController.js";


router.get("/profile/:id", checkAuth, getProfile);


export default router;

