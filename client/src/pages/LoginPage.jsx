import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"
import Navbar from "../components/Navbar"

function LoginPage() {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

  let [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: ""
  })

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/login", formData)
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        window.dispatchEvent(new Event('authChange'))
        navigate("/")
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-[#1A1A1A] border border-[#2A2A2A] p-10">

          {/* Header */}
          <h2 className="font-serif text-white text-3xl mb-2 tracking-tight">
            Welcome Back.
          </h2>
          <p className="font-mono text-[#AAAAAA] text-xs tracking-widest mb-8">
            login to your eventsphere account
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-[#2A1A1A] border border-[#FF4444] px-4 py-3 mb-6">
              <p className="font-mono text-[#FF4444] text-xs">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-6">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="loginEmail"
              value={formData.loginEmail}
              onChange={handleChange}
              placeholder="enter your email"
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Password
            </label>
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
              placeholder="enter your password"
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 font-mono text-sm font-bold tracking-widest transition-colors
              ${loading
                ? "bg-[#555555] text-[#AAAAAA] cursor-not-allowed"
                : "bg-[#E88C3A] text-[#0F0F0F] hover:bg-[#F09A4D] cursor-pointer"
              }`}
          >
            {loading ? "logging in..." : "login →"}
          </button>

          {/* Register Link */}
          <p className="font-mono text-[#AAAAAA] text-xs text-center mt-6">
            don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#E88C3A] cursor-pointer underline hover:text-[#F09A4D]"
            >
              register here
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage