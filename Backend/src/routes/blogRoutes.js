import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/checkAuth.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, likeBlog, updateBlog } from "../controllers/blogController.js";


router.get('/', getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", checkAuth, createBlog);
router.put("/:id", checkAuth, updateBlog);
router.delete("/:id", checkAuth, deleteBlog);
router.patch("/:id/like", checkAuth, likeBlog);


export default router;