import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../utils/axios"

function EventDetailsPage() {
  let navigate = useNavigate()
  let { id } = useParams()  // get event id from URL
  let [event, setEvent] = useState(null)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState("")

  // fetch event details when page loads
  useEffect(() => {
    let fetchEvent = async () => {
      try {
        let res = await API.get(`/event/get-event/${id}`)
        if (res.data.success) {
          setEvent(res.data.event)
        } else {
          setError("Event not found")
        }
        setLoading(false)
      } catch (err) {
        setError("Something went wrong")
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          EventSphere
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          ← Back to Events
        </button>
      </nav>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mt-20">Loading event details...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 mt-20">{error}</p>
      )}

      {/* Event Details */}
      {!loading && event && (
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-xl shadow-md p-8">

            {/* Event Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>

            {/* Event Info */}
            <div className="flex flex-col gap-3 mb-6">
              <p className="text-gray-500">
                📅 <span className="font-medium text-gray-700">
                  {new Date(event.date).toDateString()}
                </span>
              </p>
              <p className="text-gray-500">
                📍 <span className="font-medium text-gray-700">{event.location}</span>
              </p>
            </div>

            {/* Divider */}
            <hr className="mb-6" />

            {/* Description */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">About this Event</h3>
            <p className="text-gray-600 leading-relaxed mb-8">{event.description}</p>

            {/* Book Now Button */}
            <button
              onClick={() => alert("Payment coming soon!")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
              Book Now
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default EventDetailsPage