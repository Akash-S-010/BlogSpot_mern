import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: Verify OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      setMessage(res.data.message);
      setStep(2); // Move to OTP verification
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      setMessage(res.data.message);
      setStep(1); // Reset form after verification
      setEmail("");
      setPassword("");
      setOtp("");
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 ? "Register" : "Verify OTP"}
        </h2>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;