import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { isLoggedIn } from "../utils/auth"

function MyTicketsPage() {
  let navigate = useNavigate()

  // redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login")
    }
  }, [])

  // placeholder tickets for now
  let tickets = [
    {
      _id: "1",
      eventTitle: "Tech Meetup 2026",
      date: "2026-06-15",
      location: "Mumbai",
      status: "booked"
    },
    {
      _id: "2",
      eventTitle: "College Fest",
      date: "2026-07-01",
      location: "Pune",
      status: "used"
    },
    {
      _id: "3",
      eventTitle: "Music Night",
      date: "2026-05-10",
      location: "Delhi",
      status: "cancelled"
    }
  ]

  // status badge color
  let getStatusStyle = (status) => {
    if (status === "booked") return "bg-[#1A3A1A] text-[#4CAF50] border border-[#4CAF50]"
    if (status === "used") return "bg-[#1A1A3A] text-[#5B7FD4] border border-[#5B7FD4]"
    if (status === "cancelled") return "bg-[#2A1A1A] text-[#FF4444] border border-[#FF4444]"
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="border-b border-[#2A2A2A] pb-6 mb-10">
          <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-3">
            / your tickets
          </p>
          <h1 className="font-serif text-white text-4xl tracking-tight">
            My Tickets.
          </h1>
        </div>

        {/* No Tickets State */}
        {tickets.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-[#AAAAAA] text-sm mb-6">
              you haven't booked any tickets yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#E88C3A] text-[#0F0F0F] font-mono text-xs font-bold tracking-widest hover:bg-[#F09A4D] transition-colors cursor-pointer"
            >
              browse events →
            </button>
          </div>
        )}

        {/* Tickets List */}
        <div className="flex flex-col gap-px bg-[#2A2A2A]">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#0F0F0F] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center hover:bg-[#1A1A1A] transition-colors"
            >

              {/* Left — Event Info */}
              <div className="sm:col-span-2 flex flex-col gap-3">

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] tracking-[2px] uppercase px-2 py-1 ${getStatusStyle(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-white text-2xl leading-tight tracking-tight">
                  {ticket.eventTitle}
                </h3>

                {/* Date and Location */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <p className="font-mono text-[#AAAAAA] text-xs">
                    📅 {new Date(ticket.date).toDateString()}
                  </p>
                  <p className="font-mono text-[#AAAAAA] text-xs">
                    📍 {ticket.location}
                  </p>
                </div>

              </div>

              {/* Right — QR Code + Download */}
              <div className="flex flex-col items-center gap-4">

                {/* QR Code Placeholder */}
                <div className="w-28 h-28 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-mono text-[#AAAAAA] text-[9px] tracking-[1px] uppercase">
                      QR Code
                    </p>
                    <p className="font-mono text-[#555555] text-[8px] mt-1">
                      coming soon
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => alert("Download coming soon!")}
                  className="w-full px-4 py-2 border border-[#2A2A2A] text-[#AAAAAA] font-mono text-[10px] tracking-widest hover:border-[#E88C3A] hover:text-[#E88C3A] transition-colors cursor-pointer"
                >
                  download →
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <p className="font-mono text-[#AAAAAA] text-[10px]">
            eventsphere © 2026
          </p>
          <p className="font-mono text-[#AAAAAA] text-[10px]">
            made for local communities
          </p>
        </div>
      </footer>

    </div>
  )
}

export default MyTicketsPage