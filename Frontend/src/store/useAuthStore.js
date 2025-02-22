import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isRegistering: false,
    isVerifying: false,
    isLogging: false,


    fetchUser: async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
            if (res.data.user) {
                set({ user: res.data.user, isAuthenticated: true });
            }
        } catch (err) {
            console.error("Failed to fetch user:", err.response?.data);
            set({ user: null, isAuthenticated: false });
        }
    },
    

    register: async (username, email, password) => {
        try {
            set({ isRegistering: true });
            const res = await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
            toast.success("OTP sent to your email. Please verify.");
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            console.error("Registration failed:", err.response?.data);
            return false;
        } finally {
            set({ isRegistering: false });
        }
    },

    verifyOtp: async (email, otp) => {
        try {
            set({ isVerifying: true });
            const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp }, { withCredentials: true });
            set({ user: res.data.user, isAuthenticated: true });
            toast.success("Account verified successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "OTP verification failed");
            console.error("OTP verification failed:", err.response?.data);
        } finally {
            set({ isVerifying: false });
        }
    },

    login: async (email, password) => {
        try {
            set({ isLogging: true });

            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });

            console.log("Login Response:", res.data); // Debugging log

            if (res.data.user) {
                set({ user: res.data.user, isAuthenticated: true });
                toast.success("Login successful");
            } else {
                toast.error("Login failed: No user data received");
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            console.error("Login failed:", err.response?.data);
        } finally {
            set({ isLogging: false });
        }
    },
    

    logout: async () => {
        try {
            await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
            set({ user: null, isAuthenticated: false });
            toast.success("Logout successful");
        } catch (err) {
            toast.error("Logout failed");
            console.error("Logout failed:", err.response?.data);
        }
    },



}));
