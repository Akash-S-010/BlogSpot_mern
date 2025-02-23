import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";
import Banner from "../components/Banner";

const Home = () => {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <div className="py-8">
        <Banner />
        <div className="my-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Explore Our Blogs.
          </h1>
        </div>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">
            No blogs available. Be the first to create one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500">
                  By {blog.author?.username || "Unknown Author"}
                </p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {blog.content?.substring(0, 100) || "No content available"}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500">
                    👍 {blog.likes?.length || "0"} Likes
                  </span>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
