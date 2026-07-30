import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../utils/axios"
import Navbar from "../components/Navbar"
import Toast from "../components/Toast"
import { useToast } from "../utils/useToast"

function EventDetailsPage() {
  let navigate = useNavigate()
  let { id } = useParams()
  let [event, setEvent] = useState(null)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState("")
  let { toast, showToast, hideToast } = useToast()

let handleBookNow = async () => {
    try {
        let joinRes = await API.post("/event/join-event", { eventId: id })

        if (!joinRes.data.success) {
            alert(joinRes.data.message) 
            return
        }

        let ticketId = joinRes.data.ticket._id

        if (!event.ticketPrice || event.ticketPrice === 0) {
            alert("Event booked successfully! It's a free event.")
            navigate("/my-tickets")
            return
        }

        let orderRes = await API.post("/payment/create-order", { ticketId })

        if (!orderRes.data.success) {
            alert("Could not create payment order")
            return
        }

        let { order, key } = orderRes.data

        let options = {
            key: key,
            amount: order.amount,
            currency: order.currency,
            name: "EventSphere",
            description: event.title,
            order_id: order.id,
            handler: async function (response) {
                try {
                    let verifyRes = await API.post("/payment/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        ticketId: ticketId
                    })

                    if (verifyRes.data.success) {
                        alert("Payment successful! Ticket booked.")
                        navigate("/my-tickets")
                    } else {
                        alert("Payment verification failed")
                    }
                } catch (err) {
                    alert("Something went wrong verifying payment")
                }
            },
            theme: {
                color: "#E88C3A"
            }
        }

        let razorpayInstance = new window.Razorpay(options)
        razorpayInstance.open()

    } catch (err) {
        console.log(err)
        alert("Something went wrong. Try again.")
    }
}

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
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-[#2A2A2A]">
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[#AAAAAA] text-xs tracking-widest hover:text-[#E88C3A] transition-colors cursor-pointer"
        >
          ← back to events
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="font-mono text-[#AAAAAA] text-sm text-center py-20">
          loading event...
        </p>
      )}

      {/* Error State */}
      {error && (
        <p className="font-mono text-[#FF4444] text-sm text-center py-20">
          {error}
        </p>
      )}

      {/* Event Details */}
      {!loading && event && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — Event Info */}
            <div className="lg:col-span-2">

              {/* Label */}
              <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-4">
                / event details
              </p>

              {/* Title */}
              <h1 className="font-serif text-white text-4xl sm:text-5xl leading-tight tracking-tight mb-8">
                {event.title}
              </h1>

              {/* Date and Location */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-[#2A2A2A]">
                <div>
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-2">
                    DATE
                  </p>
                  <p className="font-mono text-white text-sm">
                    📅 {new Date(event.date).toDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-2">
                    LOCATION
                  </p>
                  <p className="font-mono text-white text-sm">
                    📍 {event.location}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-4">
                  ABOUT THIS EVENT
                </p>
                <p className="font-mono text-[#AAAAAA] text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

            </div>

            {/* Right — Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 sticky top-24">

                {/* Card Label */}
                <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-6">
                  / book your spot
                </p>

                {/* Event Title in Card */}
                <h3 className="font-serif text-white text-xl leading-tight mb-6">
                  {event.title}
                </h3>

                {/* Divider */}
                <div className="border-t border-[#2A2A2A] mb-6"></div>

                {/* Date */}
                <div className="mb-4">
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-1">
                    DATE
                  </p>
                  <p className="font-mono text-white text-xs">
                    {new Date(event.date).toDateString()}
                  </p>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[3px] uppercase mb-1">
                    LOCATION
                  </p>
                  <p className="font-mono text-white text-xs">
                    {event.location}
                  </p>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-[#E88C3A] text-[#0F0F0F] font-mono text-sm font-bold tracking-widest hover:bg-[#F09A4D] transition-colors cursor-pointer"
                >
                  book now →
                </button>

                {/* Note */}
                <p className="font-mono text-[#AAAAAA] text-[10px] text-center mt-4 leading-relaxed">
                  secure payment via razorpay.<br />qr ticket sent instantly.
                </p>

              </div>
            </div>

          </div>
        </div>
      )}

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

export default EventDetailsPage