import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/axios"
import { isLoggedIn } from "../utils/auth"
import Navbar from "../components/Navbar"

function LandingPage() {
  let navigate = useNavigate()
  let [events, setEvents] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    let fetchEvents = async () => {
      try {
        let res = await API.get("/event/all-events")
        setEvents(res.data.events)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  let handleBookNow = (eventId) => {
    if (!isLoggedIn()) {
      navigate("/register")
    } else {
      navigate(`/event/${eventId}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      {/* Hero Section */}
      <div className="border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — Big Heading */}
            <div>
              <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-6">
                / discover local events
              </p>
              <h1 className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight mb-6">
                Discover<br />
                Events<br />
                <em className="text-[#E88C3A] not-italic">Near You.</em>
              </h1>
              <p className="font-mono text-[#AAAAAA] text-sm leading-relaxed max-w-md">
                no queues. no paper. just local events worth showing up for — booked instantly with UPI.
              </p>
            </div>

            {/* Right — Flyer Style Info Block */}
            <div className="border border-[#2A2A2A] p-8 bg-[#1A1A1A]">
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-2">
                    WHAT:
                  </p>
                  <p className="font-mono text-white text-sm leading-relaxed">
                    local events, workshops,<br />college fests & more.
                  </p>
                </div>
                <div className="border-t border-[#2A2A2A] pt-6">
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-2">
                    HOW:
                  </p>
                  <p className="font-mono text-white text-sm leading-relaxed">
                    book instantly.<br />pay via UPI. get your QR ticket.
                  </p>
                </div>
                <div className="border-t border-[#2A2A2A] pt-6">
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-2">
                    WHY:
                  </p>
                  <p className="font-mono text-white text-sm leading-relaxed">
                    no algorithms. no influencers.<br />just real events for real people.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Section Header */}
        <div className="flex justify-between items-baseline border-b border-[#2A2A2A] pb-4 mb-8">
          <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase">
            / upcoming events
          </p>
          <p className="font-mono text-[#AAAAAA] text-[10px]">
            {events.length} events listed
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="font-mono text-[#AAAAAA] text-sm text-center py-20">
            fetching events...
          </p>
        )}

        {/* No Events State */}
        {!loading && events.length === 0 && (
          <p className="font-mono text-[#AAAAAA] text-sm text-center py-20">
            no events yet. check back soon.
          </p>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-[#0F0F0F] p-6 flex flex-col gap-4 hover:bg-[#1A1A1A] transition-colors duration-200"
            >
              {/* Date */}
              <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[2px] uppercase">
                {new Date(event.date).toDateString().toUpperCase()}
              </p>

              {/* Title */}
              <h3 className="font-serif text-white text-2xl leading-tight tracking-tight">
                {event.title}
              </h3>

              {/* Location */}
              <p className="font-mono text-[#AAAAAA] text-xs">
                📍 {event.location}
              </p>

              {/* Description */}
              <p className="font-mono text-[#AAAAAA] text-xs leading-relaxed flex-grow">
                {event.description}
              </p>

              {/* Book Button */}
              <button
                onClick={() => handleBookNow(event._id)}
                className="w-full py-3 bg-[#E88C3A] text-[#0F0F0F] font-mono text-xs font-bold tracking-widest hover:bg-[#F09A4D] transition-colors duration-200 mt-2"
              >
                book now →
              </button>
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

export default LandingPage