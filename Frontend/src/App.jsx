import React, { useEffect } from "react";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import BlogDetails from "./pages/BlogDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  const { user,isAuthenticated, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser(); 
  }, []);

  console.log(user)

  return (
    <div className="bg-gray-400">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/create" element={isAuthenticated ? <CreateBlog /> : <Navigate to="/login" />}/>
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
