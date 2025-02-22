import { useEffect } from "react";
import {useAuthStore} from "../store/useAuthStore";
import {useBlogStore} from "../store/useBlogStore";

const Profile = () => {
    const { user } = useAuthStore();
    const { blogs, fetchBlogs } = useBlogStore();

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Filter blogs by logged-in user
    const userBlogs = blogs.filter((blog) => blog.author._id === user._id);

    return (
        <div className="max-w-4xl mx-auto p-4 min-h-screen">
            <h2 className="text-xl font-bold">Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <h3 className="mt-4 text-lg font-semibold">Your Blogs</h3>
            {userBlogs.length === 0 ? (
                <p>You haven’t written any blogs yet.</p>
            ) : (
                userBlogs.map((blog) => (
                    <div key={blog._id} className="border p-3 rounded my-2 shadow">
                        <h4 className="font-bold">{blog.title}</h4>
                        <p>{blog.content.substring(0, 100)}...</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Profile;
