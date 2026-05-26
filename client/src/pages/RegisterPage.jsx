import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"
import Navbar from "../components/Navbar"

function RegisterPage() {
  let navigate = useNavigate()
  let [step, setStep] = useState(1)
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

  let [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    otp: ""
  })

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSendOTP = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/send-otp", { userEmail: formData.userEmail })
      if (res.data.status) {
        setStep(2)
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  let handleRegister = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/create", formData)
      if (res.data.success) {
        navigate("/login")
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

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-6 h-6 flex items-center justify-center font-mono text-xs font-bold
              ${step === 1 ? "bg-[#E88C3A] text-[#0F0F0F]" : "bg-[#2A2A2A] text-[#AAAAAA]"}`}>
              1
            </div>
            <div className="flex-1 h-px bg-[#2A2A2A]"></div>
            <div className={`w-6 h-6 flex items-center justify-center font-mono text-xs font-bold
              ${step === 2 ? "bg-[#E88C3A] text-[#0F0F0F]" : "bg-[#2A2A2A] text-[#AAAAAA]"}`}>
              2
            </div>
          </div>

          {/* Header */}
          <h2 className="font-serif text-white text-3xl mb-2 tracking-tight">
            {step === 1 ? "Create Account." : "Almost Done."}
          </h2>
          <p className="font-mono text-[#AAAAAA] text-xs tracking-widest mb-8">
            {step === 1 ? "step 1 of 2 — enter your email" : "step 2 of 2 — fill your details"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-[#2A1A1A] border border-[#FF4444] px-4 py-3 mb-6">
              <p className="font-mono text-[#FF4444] text-xs">{error}</p>
            </div>
          )}

          {/* Step 1 — Email */}
          {step === 1 && (
            <div>
              <div className="mb-8">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="enter your email"
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className={`w-full py-3 font-mono text-sm font-bold tracking-widest transition-colors
                  ${loading
                    ? "bg-[#555555] text-[#AAAAAA] cursor-not-allowed"
                    : "bg-[#E88C3A] text-[#0F0F0F] hover:bg-[#F09A4D] cursor-pointer"
                  }`}
              >
                {loading ? "sending otp..." : "send otp →"}
              </button>
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="enter your name"
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                  placeholder="enter your phone number"
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  placeholder="create a password"
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>

              <div className="mb-8">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="enter otp sent to your email"
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-[#2A2A2A] text-[#AAAAAA] font-mono text-sm font-bold tracking-widest hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  ← back
                </button>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className={`flex-1 py-3 font-mono text-sm font-bold tracking-widest transition-colors
                    ${loading
                      ? "bg-[#555555] text-[#AAAAAA] cursor-not-allowed"
                      : "bg-[#E88C3A] text-[#0F0F0F] hover:bg-[#F09A4D] cursor-pointer"
                    }`}
                >
                  {loading ? "creating account..." : "create account →"}
                </button>
              </div>
            </div>
          )}

          {/* Login Link */}
          <p className="font-mono text-[#AAAAAA] text-xs text-center mt-6">
            already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#E88C3A] cursor-pointer underline hover:text-[#F09A4D]"
            >
              login here
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage