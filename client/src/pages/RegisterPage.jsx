import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"

function RegisterPage() {
  let navigate = useNavigate()

  // steps: 1 = enter email, 2 = enter otp + details
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

  // handle input change
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Step 1 — send OTP
  let handleSendOTP = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/send-otp", { userEmail: formData.userEmail })
      if (res.data.status) {
        setStep(2)  // move to step 2
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  // Step 2 — create user
  let handleRegister = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/create", formData)
      if (res.data.status) {
        navigate("/login")  // redirect to login after success
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm mb-6">Join EventSphere to book events instantly</p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Step 1 - Email */}
        {step === 1 && (
          <div>
            <label className="text-sm text-gray-600 font-medium">Email Address</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2 - OTP + Details */}
        {step === 2 && (
          <div>
            <label className="text-sm text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm text-gray-600 font-medium">Phone Number</label>
            <input
              type="text"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
            />

            <label className="text-sm text-gray-600 font-medium">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP sent to your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        )}

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage