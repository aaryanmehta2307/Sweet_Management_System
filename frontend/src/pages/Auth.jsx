import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { jwtDecode } from "jwt-decode";

/* ===================== LOGIN FORM ===================== */
const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const data = await apiRequest("/api/auth/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", data.token);

      // decode role
      const decoded = jwtDecode(data.token);

      // callback with role
      onSuccess(decoded.role);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="mb-4 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-6 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-[var(--color-primary)] py-3 rounded-full font-medium active:scale-95 transition"
      >
        Login
      </button>
    </div>
  );
};

/* ===================== SIGNUP FORM ===================== */
const SignupForm = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    try {
      await apiRequest("/api/auth/register", form);
      switchToLogin(); // redirect to login after signup
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-6">Create Account</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        placeholder="Name"
        className="mb-3 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="mb-3 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-3 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        placeholder="Admin Key (optional)"
        className="mb-6 px-4 py-3 rounded bg-[var(--color-soft)] outline-none"
        onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
      />

      <button
        onClick={handleSignup}
        className="bg-[var(--color-primary)] py-3 rounded-full font-medium active:scale-95 transition"
      >
        Sign Up
      </button>
    </div>
  );
};

/* ===================== AUTH PAGE ===================== */
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // 🔥 ROLE-BASED REDIRECT
  const handleLoginSuccess = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="relative w-full max-w-4xl min-h-[520px] md:h-[520px] rounded-2xl shadow-xl overflow-hidden bg-[var(--color-base)]">

        {/* FORM SECTION */}
        <div
          className={`w-full md:w-1/2 p-8 md:p-10 transition-transform duration-700 ${
            isSignup ? "md:translate-x-full" : ""
          }`}
        >
          {isSignup ? (
            <SignupForm switchToLogin={() => setIsSignup(false)} />
          ) : (
            <LoginForm onSuccess={handleLoginSuccess} />
          )}
        </div>

        {/* SLIDER PANEL (DESKTOP) */}
        <div
          className={`hidden md:flex absolute top-0 right-0 w-1/2 h-full flex-col items-center justify-center text-center p-10 transition-transform duration-700 ${
            isSignup ? "-translate-x-full" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-soft))",
          }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {isSignup ? "Welcome Back!" : "Hello Sweet Lover 🍰"}
          </h2>

          <p className="opacity-80 mb-6">
            {isSignup
              ? "Already have an account? Login to continue."
              : "New here? Create an account and explore sweets."}
          </p>

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="px-6 py-3 rounded-full border-2 border-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-white transition"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden text-center pb-6">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm underline opacity-70"
          >
            {isSignup ? "Login instead" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
