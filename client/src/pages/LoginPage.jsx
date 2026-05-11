import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"

function LoginPage() {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

  let [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: ""
  })

  // handle input change
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handle login
  let handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      let res = await API.post("/user/login", formData)
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)  // save token
        navigate("/")                                   // redirect to landing page
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
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm mb-6">Login to your EventSphere account</p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Email */}
        <label className="text-sm text-gray-600 font-medium">Email Address</label>
        <input
          type="email"
          name="loginEmail"
          value={formData.loginEmail}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
        />

        {/* Password */}
        <label className="text-sm text-gray-600 font-medium">Password</label>
        <input
          type="password"
          name="loginPassword"
          value={formData.loginPassword}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 mb-4 focus:outline-none focus:border-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  )
}

export default LoginPage