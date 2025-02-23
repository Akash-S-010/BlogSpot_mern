import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";
import avatar from "../assets/pngwing.com.png";

const Profile = () => {
  const { user } = useAuthStore();
  const { blogs, fetchBlogs, deleteBlog } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs by logged-in user
  const userBlogs = blogs.filter((blog) => blog.author._id === user._id);

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    await deleteBlog(blogId); // Call delete function
    fetchBlogs();
  };

  return (
      <div className="max-w-7xl mx-auto p-6 min-h-screen">
        <div className="card bg-slate-100 px-6 py-6 sm:px-10 sm:py-8 rounded-lg w-full max-w-md mx-auto mt-28">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Profile
          </h1>
          <p className="text-slate-500 text-center text-sm sm:text-base">
            Your profile information
          </p>
          <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mx-auto mt-4 sm:mt-5">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="details mt-5">
            <div className="input-container w-full mb-4">
              <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
                User Name
              </label>
              <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600 text-sm sm:text-base">
                {user?.username}
              </div>
            </div>
            <div className="input-container w-full">
              <label
                htmlFor="email"
                className="block mb-1 text-sm sm:text-base"
              >
                Email
              </label>
              <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600 text-sm sm:text-base">
                {user?.email}
              </div>
            </div>
            <div className="account-information mt-6 sm:mt-8">
              <h1 className="text-lg sm:text-xl font-semibold">
                Account Information
              </h1>
              <div className="w-full flex justify-between mt-4 sm:mt-5 text-sm sm:text-base">
                <p>Member Since</p>
                <p>{user.createdAt.split("T")[0]}</p>
              </div>
            </div>
            <hr className="my-2 border border-slate-400" />
            <div className="w-full flex justify-between text-sm sm:text-base">
              <p>Account Status</p>
              <p className="text-green-600">Active</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Blogs
          </h3>
          {userBlogs.length === 0 ? (
            <p className="text-gray-600">You haven’t written any blogs yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {userBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h4 className="text-lg font-bold text-gray-900">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default Profile;
