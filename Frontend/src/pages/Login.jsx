import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) 
      await navigate("/create");
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">
        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Log in</h2>
          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
            </div>
            <div className="!mt-8">
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                {isLoggingIn ? "Logging in..." : "Log in"}
              </button>
            </div>
            <p className="text-gray-800 text-sm !mt-8 text-center">
              Don't have an account?
              <a href="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
