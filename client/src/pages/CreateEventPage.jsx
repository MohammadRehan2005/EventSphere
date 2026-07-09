import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"
import Navbar from "../components/Navbar"

function CreateEventPage() {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [message, setMessage] = useState("")
  let [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    ticketPrice: ""
  })

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [])

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.location) {
      setMessage("❌ Title, date and location are required")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      let res = await API.post("/event/create-event", formData)
      if (res.data.success) {
        setMessage("✅ Event created successfully!")
        setFormData({ title: "", date: "", location: "", description: "", ticketPrice: "" })
        setTimeout(() => navigate("/"), 1500)
      } else {
        setMessage("❌ " + res.data.message)
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="border-b border-[#2A2A2A] pb-6 mb-10">
          <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-3">
            / host an event
          </p>
          <h1 className="font-serif text-white text-4xl tracking-tight">
            Create Event.
          </h1>
        </div>

        <div className="max-w-xl">

          {/* Message */}
          {message && (
            <div className={`border px-4 py-3 mb-6 font-mono text-xs
              ${message.includes("✅")
                ? "border-[#4CAF50] text-[#4CAF50] bg-[#1A3A1A]"
                : "border-[#FF4444] text-[#FF4444] bg-[#2A1A1A]"
              }`}>
              {message}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="enter event title"
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] transition-colors"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="enter location"
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
            />
          </div>

          {/* Ticket Price */}
          <div className="mb-6">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Ticket Price (₹)
            </label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              placeholder="0 for free event"
              className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="describe your event"
              rows={4}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-white font-mono text-sm outline-none focus:border-[#E88C3A] placeholder-[#555555] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 font-mono text-sm font-bold tracking-widest transition-colors
              ${loading
                ? "bg-[#555555] text-[#AAAAAA] cursor-not-allowed"
                : "bg-[#E88C3A] text-[#0F0F0F] hover:bg-[#F09A4D] cursor-pointer"
              }`}
          >
            {loading ? "creating event..." : "create event →"}
          </button>

          {/* Cancel */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 font-mono text-sm text-[#AAAAAA] hover:text-white transition-colors cursor-pointer mt-3"
          >
            ← cancel
          </button>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <p className="font-mono text-[#AAAAAA] text-[10px]">eventsphere © 2026</p>
          <p className="font-mono text-[#AAAAAA] text-[10px]">made for local communities</p>
        </div>
      </footer>

    </div>
  )
}

export default CreateEventPage