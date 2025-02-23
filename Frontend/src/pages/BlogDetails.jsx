import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";
import { Loader } from "lucide-react";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs } = useBlogStore();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogs.find((b) => b._id === id);
    setBlog(foundBlog);
  }, [id, blogs]);

  if (!blog)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center bg-gray-300 py-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-gray-500 mt-2">By {blog.author.username}</p>
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-md mt-6 mb-8"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 rounded-md mt-6 mb-8 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <p className="mt-8 text-gray-700 text-xl leading-8">{blog.content}</p>
        <div className="flex justify-between items-center mt-5">
          <p className="mt-4 text-gray-500">👍 {blog.likes.length} Likes</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-1 rounded-md mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;