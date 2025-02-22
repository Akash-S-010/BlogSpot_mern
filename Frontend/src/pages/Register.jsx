import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOtp, isRegistering, isVerifying } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleRegister = async () => {
    const success = await register(username, email, password);
    if (success) setStep(2);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(email, otp);
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className='text-2xl font-semibold'>{step === 1 ? "Register" : "Verify OTP"}</h1>
        </div>
        {step === 1 ? (
          <form>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
              
            </div>
            <div className="!mt-8">
              <button
                type="button"
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                {isRegistering ? "Registering..." : "Create an account"}
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
            </p>
          </form>
        ) : (
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Enter OTP"
            />
            <div className="!mt-8">
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
