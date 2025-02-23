import { create } from "zustand";
import axios from "axios";
import CreateBlog from "../pages/CreateBlog";
import toast from "react-hot-toast";

export const useBlogStore = create((set, get) => ({
    blogs: [],

    fetchBlogs: async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/blog");
            set({ blogs: res.data });
        } catch (err) {
            console.error("Failed to fetch blogs", err);
        }
    },

    createBlog: async (title, content, image) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/blog",
                { title, content, image },
                { withCredentials: true }
            );

            set({ blogs: [...get().blogs, res.data] });
            toast.success("Blog created successfully");
            return true; // Indicate success
        } catch (err) {
            toast.error(err.response?.data?.message || "Blog creation failed");
            console.error("Failed to create blog", err);
            return false; // Indicate failure
        }
    }
}));



