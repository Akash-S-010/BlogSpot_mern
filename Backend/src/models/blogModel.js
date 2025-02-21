import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export default Blog = mongoose.model("Blog", blogSchema);
