// src/components/Auth/LoginForm.jsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import fetchFunction from "../../utils/fetchFunction";
import { LOGIN_URL } from "../../utils/constants";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fetchError,setFetchError] = useState("");

  const handleLogin =async (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/;

    let isValid = true;

    if (!gmailRegex.test(email)) {
      setEmailError("Invalid email address (must be @gmail.com)");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    login(email);
    console.log("LoginForm: login() called with", email);

    const postData = {
      email,password
    }

    const result = await fetchFunction({
      apiUrl : LOGIN_URL,
      crudMethod : "POST",
      postData,
      setError : setFetchError
    })

    if(result?.status === "success"){
      sessionStorage.setItem("aiInterviewerAccessToken",result?.accessToken)
      navigate("/dashboard");
    }else{
      console.log("error in fetch : ", fetchError)
    }


  };

  return (
    <>
      {/* Header */}
      <header className="w-full fixed top-0 left-0 flex justify-between items-center px-10 py-4 bg-[#1e3a8a]/70 backdrop-blur-md shadow-lg border-b border-blue-400/30 z-50">
        <h1 className="flex items-center text-3xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
          <span className="text-white mr-2">🤖</span>
          AI <span className="text-blue-300 ml-1">Interviewer</span>
        </h1>
        <nav className="flex space-x-6 text-lg font-semibold">
          <button
            onClick={() => (window.location.href = "/about")}
            className="text-white hover:text-blue-400 transition"
          >
            About Us
          </button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-white hover:text-blue-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="text-white hover:text-blue-400 transition"
          >
            Signup
          </button>
        </nav>
      </header>

      {/* Page Layout */}
      <div className="flex justify-between items-center min-h-screen px-10 bg-gradient-to-br from-[#a7c0f2] via-[#7ea1e8] to-[#a7c0f2] pt-24">
        {/* Left Section */}
        <div className="flex flex-col justify-center w-1/2 pl-10">
          <h1 className="text-6xl font-extrabold text-brown-700 mb-4 drop-shadow-sm">
            AI Interviewer
          </h1>
          <p className="text-xl text-white-600 font-medium">
            Practice Smart. Interview Confidently.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="flex justify-center items-center w-1/2">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg w-96 text-center"
          >
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome 👋</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email */}
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                required
                className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm font-medium -mt-2">
                  {emailError}
                </p>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  required
                  className={`p-3 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                >
                  {/* Eye open = password visible, Eye slashed = hidden */}
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm font-medium -mt-2">
                  {passwordError}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
