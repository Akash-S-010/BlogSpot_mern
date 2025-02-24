import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createBlog } = useBlogStore();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a blog.");
      navigate("/login");
      return;
    }

    const success = await createBlog(
      formData.title,
      formData.content,
      formData.image
    );

    if (success) {
      navigate("/")
      toast.success("Blog created successfully")
    } else {
      toast.error("Failed to create blog");
    }
  };

  return (
      <div className="max-w-5xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-xl font-bold text-center mb-4">
            Create a New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            <textarea
              name="content"
              placeholder="Write your content here..."
              className="w-full p-2 border rounded"
              rows="5"
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 transition cursor-pointer text-white px-4 py-2 rounded"
            >
              Publish
            </button>
          </form>
        </div>
      </div>
  );
};

export default CreateBlog;
