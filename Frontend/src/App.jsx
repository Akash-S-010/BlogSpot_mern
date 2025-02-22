import React, { useEffect } from "react";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import CreateBlog from "./pages/createBlog";
import Profile from "./pages/Profile";

const App = () => {
  const { user,isAuthenticated, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser(); 
  }, []);

  console.log(user)

  return (
    <div className="bg-gray-500">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={isAuthenticated ? <CreateBlog /> : <Navigate to="/login" />}/>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
