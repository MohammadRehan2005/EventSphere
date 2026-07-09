import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"
import Navbar from "../components/Navbar"

function AdminDashboard() {
  let navigate = useNavigate()
  let [stats, setStats] = useState(null)
  let [events, setEvents] = useState([])
  let [attendees, setAttendees] = useState([])
  let [loading, setLoading] = useState(true)
  let [activeTab, setActiveTab] = useState("stats")
  let [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    ticketPrice: ""
  })
  let [formLoading, setFormLoading] = useState(false)
  let [formMessage, setFormMessage] = useState("")

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!token) {
        navigate("/login")
        return
    }
    fetchStats()
    fetchEvents()
    fetchAttendees()
}, [])

  let fetchStats = async () => {
    try {
      let res = await API.get("/admin/stats")
      if (res.data.success) setStats(res.data.stats)
    } catch (err) {
      console.log(err)
    }
  }

  let fetchEvents = async () => {
    try {
      let res = await API.get("/admin/events")
      if (res.data.success) setEvents(res.data.events || [])
    } catch (err) {
      console.log(err)
    }
  }

  let fetchAttendees = async () => {
    try {
      let res = await API.get("/admin/attendees")
      if (res.data.success) setAttendees(res.data.tickets || [])
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleCreateEvent = async () => {
    setFormLoading(true)
    setFormMessage("")
    try {
      let res = await API.post("/admin/create-event", formData)
      if (res.data.success) {
        setFormMessage("✅ Event created successfully!")
        setFormData({ title: "", date: "", location: "", description: "", ticketPrice: "" })
        fetchEvents()
      } else {
        setFormMessage("❌ " + res.data.message)
      }
    } catch (err) {
      setFormMessage("❌ Something went wrong")
    }
    setFormLoading(false)
  }

  let handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return
    try {
      let res = await API.delete(`/admin/delete-event/${eventId}`)
      if (res.data.success) {
        fetchEvents()
      }
    } catch (err) {
      console.log(err)
    }
  }

  let tabs = ["stats", "events", "create event", "attendees"]

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="border-b border-[#2A2A2A] pb-6 mb-8">
          <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-3">
            / admin panel
          </p>
          <h1 className="font-serif text-white text-4xl tracking-tight">
            Dashboard.
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#2A2A2A] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer
                ${activeTab === tab
                  ? "bg-[#E88C3A] text-[#0F0F0F] font-bold"
                  : "text-[#AAAAAA] hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2A2A]">
            {[
              { label: "Total Events", value: stats.totalEvents },
              { label: "Total Tickets", value: stats.totalTickets },
              { label: "Total Users", value: stats.totalUsers },
              { label: "Total Revenue", value: `₹${stats.totalRevenue}` },
            ].map((item) => (
              <div key={item.label} className="bg-[#0F0F0F] p-8 hover:bg-[#1A1A1A] transition-colors">
                <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-4">
                  {item.label}
                </p>
                <p className="font-serif text-white text-4xl tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-baseline border-b border-[#2A2A2A] pb-4 mb-6">
              <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase">
                / all events
              </p>
              <p className="font-mono text-[#AAAAAA] text-[10px]">
                {events.length} events
              </p>
            </div>

            <div className="flex flex-col gap-px bg-[#2A2A2A]">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-[#0F0F0F] p-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="sm:col-span-3">
                    <h3 className="font-serif text-white text-xl mb-2">{event.title}</h3>
                    <div className="flex gap-6">
                      <p className="font-mono text-[#AAAAAA] text-xs">
                        📅 {new Date(event.date).toDateString()}
                      </p>
                      <p className="font-mono text-[#AAAAAA] text-xs">
                        📍 {event.location}
                      </p>
                      <p className="font-mono text-[#E88C3A] text-xs">
                        ₹{event.ticketPrice}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="px-4 py-2 border border-[#FF4444] text-[#FF4444] font-mono text-xs hover:bg-[#FF4444] hover:text-white transition-colors cursor-pointer"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Event Tab */}
        {activeTab === "create event" && (
          <div className="max-w-xl">
            <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-8">
              / create new event
            </p>

            {formMessage && (
              <div className={`border px-4 py-3 mb-6 font-mono text-xs
                ${formMessage.includes("✅")
                  ? "border-[#4CAF50] text-[#4CAF50] bg-[#1A3A1A]"
                  : "border-[#FF4444] text-[#FF4444] bg-[#2A1A1A]"
                }`}>
                {formMessage}
              </div>
            )}

            {[
              { label: "Event Title", name: "title", type: "text", placeholder: "enter event title" },
              { label: "Date", name: "date", type: "date", placeholder: "" },
              { label: "Location", name: "location", type: "text", placeholder: "enter location" },
              { label: "Ticket Price (₹)", name: "ticketPrice", type: "number", placeholder: "enter price" },
            ].map((field) => (
              <div key={field.name} className="mb-6">
                <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-[#0F0F0F] border-0 border-b border-[#2A2A2A] px-0 py-2 text-white font-mono text-sm outline-none focus:border-b focus:border-[#E88C3A] placeholder-[#555555] transition-colors"
                />
              </div>
            ))}

            <div className="mb-8">
              <label className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase block mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="enter event description"
                rows={4}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-white font-mono text-sm outline-none focus:border-[#E88C3A] placeholder-[#555555] transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleCreateEvent}
              disabled={formLoading}
              className={`w-full py-3 font-mono text-sm font-bold tracking-widest transition-colors
                ${formLoading
                  ? "bg-[#555555] text-[#AAAAAA] cursor-not-allowed"
                  : "bg-[#E88C3A] text-[#0F0F0F] hover:bg-[#F09A4D] cursor-pointer"
                }`}
            >
              {formLoading ? "creating event..." : "create event →"}
            </button>
          </div>
        )}

        {/* Attendees Tab */}
        {activeTab === "attendees" && (
          <div>
            <div className="flex justify-between items-baseline border-b border-[#2A2A2A] pb-4 mb-6">
              <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase">
                / all attendees
              </p>
              <p className="font-mono text-[#AAAAAA] text-[10px]">
                {attendees.length} tickets
              </p>
            </div>

            <div className="flex flex-col gap-px bg-[#2A2A2A]">
              {attendees.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-[#0F0F0F] p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 hover:bg-[#1A1A1A] transition-colors"
                >
                  <div>
                    <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[2px] uppercase mb-2">User</p>
                    <p className="font-mono text-white text-sm">{ticket.userId?.userName}</p>
                    <p className="font-mono text-[#AAAAAA] text-xs mt-1">{ticket.userId?.userEmail}</p>
                    <p className="font-mono text-[#AAAAAA] text-xs">{ticket.userId?.userPhone}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[2px] uppercase mb-2">Event</p>
                    <p className="font-mono text-white text-sm">{ticket.eventId?.title}</p>
                    <p className="font-mono text-[#AAAAAA] text-xs mt-1">
                      📅 {new Date(ticket.eventId?.date).toDateString()}
                    </p>
                    <p className="font-mono text-[#AAAAAA] text-xs">
                      📍 {ticket.eventId?.location}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[2px] uppercase mb-2">Status</p>
                    <span className={`font-mono text-[10px] tracking-[2px] uppercase px-2 py-1
                      ${ticket.status === "booked" ? "bg-[#1A3A1A] text-[#4CAF50] border border-[#4CAF50]" : ""}
                      ${ticket.status === "used" ? "bg-[#1A1A3A] text-[#5B7FD4] border border-[#5B7FD4]" : ""}
                      ${ticket.status === "cancelled" ? "bg-[#2A1A1A] text-[#FF4444] border border-[#FF4444]" : ""}
                    `}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <p className="font-mono text-[#AAAAAA] text-[10px]">eventsphere © 2026</p>
          <p className="font-mono text-[#AAAAAA] text-[10px]">admin panel</p>
        </div>
      </footer>

    </div>
  )
}

export default AdminDashboard