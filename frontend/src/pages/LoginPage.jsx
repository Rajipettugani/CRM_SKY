import { useState } from "react";
import api from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("password@123");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      if (email === "salesmanager@test.com") {
        nav("/manager");
      } else {
        nav("/");
      }
    } catch (e) {
      setErr(e.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-white">
      {/* Centered Card */}
      <div className="flex w-[1050px] h-[550px] rounded-2xl overflow-hidden bg-white shadow-[0_40px_90px_rgba(126,34,206,0.3)]">
        {/* Left Section */}
        <div
          className="w-1/2 text-white flex flex-col justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/Login.png')",
            borderTopRightRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem",
          }}
        >
          <div className="max-w-sm space-y-6  p-6 rounded-xl">
            {/* Title and Tagline */}
            <div className="space-y-2">
              <h2 className="text-6xl font-bold  font-garamond text-cream-900">
                SKY CRM
              </h2>
              <p className="text-xl font-semibold">Beyond Reach..</p>
            </div>

            {/* Stats Section */}
            <div className="space-y-4 text-left">
              <div>
                <p className="opacity-70 text-sm">Today's Views</p>
                <p className="text-lg font-semibold">1,187,249</p>
              </div>
              <div>
                <p className="opacity-70 text-sm">Today's Submissions</p>
                <p className="text-lg font-semibold">271,564</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-[500px] flex justify-center items-center bg-white">
          <form
            onSubmit={onSubmit}
            className="p-10 w-[380px] h-[420px] space-y-6  rounded-xl"
          >
            <h1 className="text-4xl font-light font-dosis italic text-center">
              Welcome to CRM
            </h1>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <div className="space-y-2">
              <label className="text-base font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white text-base font-semibold rounded-lg transition">
              Login
            </button>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" /> Remember Me
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
