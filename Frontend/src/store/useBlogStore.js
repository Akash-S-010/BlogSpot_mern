import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useBlogStore = create((set, get) => ({
    blogs: [],

    fetchBlogs: async () => {
        try {
            const res = await axios.get("https://blogspot-mern-twjo.onrender.com/api/blog");
            set({ blogs: res.data });
        } catch (err) {
            console.error("Failed to fetch blogs", err);
        }
    },

    createBlog: async (title, content, image) => {
        try {
            const res = await axios.post(
                "https://blogspot-mern-twjo.onrender.com/api/blog",
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
    },

    updateBlog: async (blogId, updatedData) => {
        try {
            const res = await axios.put(`https://blogspot-mern-twjo.onrender.com/api/blog/${blogId}`, updatedData);
            set((state) => ({
                blogs: state.blogs.map((blog) =>
                    blog._id === blogId ? res.data.blog : blog
                ),
            }));
            toast.success("Blog updated successfully");
            return res.data.blog;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update blog");
            console.error("Update blog failed:", err.response?.data);
            throw err;
        }
    },

    deleteBlog: async (blogId) => {
        try {
            await axios.delete(`https://blogspot-mern-twjo.onrender.com/api/blog/${blogId}`, { withCredentials: true });
            set({ blogs: get().blogs.filter((blog) => blog._id !== blogId) });
            toast.success("Blog deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Blog deletion failed");
            console.error("Failed to delete blog", err);
        }
    },

    likeBlog: async (blogId) => {
        try {
            const res = await axios.patch(`https://blogspot-mern-twjo.onrender.com/api/blog/${blogId}/like`, {}, { withCredentials: true });
            set((state) => ({
                blogs: state.blogs.map(blog =>
                    blog._id === blogId ? { ...blog, likes: blog.likes.includes(blogId) ? blog.likes.filter(id => id !== blogId) : [...blog.likes, blogId] } : blog
                )
            }));
        } catch (error) {
            console.error("Error liking blog", error);
        }
    }
}));



