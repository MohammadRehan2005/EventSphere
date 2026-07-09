import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { isLoggedIn } from "../utils/auth";
import API from "../utils/axios";

function MyTicketsPage() {
  let navigate = useNavigate();
  let [tickets, setTickets] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("token:", localStorage.getItem("token"));
    console.log("isLoggedIn:", isLoggedIn());

    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTickets();
  }, []);

  let fetchTickets = async () => {
    try {
      let res = await API.get("/event/my-tickets");
      if (res.data.success) {
        setTickets(res.data.tickets || []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setTickets([]);
      setLoading(false);
    }
  };

  let getStatusStyle = (status) => {
    if (status === "booked")
      return "bg-[#1A3A1A] text-[#4CAF50] border border-[#4CAF50]";
    if (status === "used")
      return "bg-[#1A1A3A] text-[#5B7FD4] border border-[#5B7FD4]";
    if (status === "cancelled")
      return "bg-[#2A1A1A] text-[#FF4444] border border-[#FF4444]";
  };

  let handleDownload = (qrCode, eventTitle) => {
    if (!qrCode) return

    let link = document.createElement("a")
    link.href = qrCode
    link.download = `${eventTitle || "ticket"}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

        {/* Loading State */}
        {loading && (
          <p className="font-mono text-[#AAAAAA] text-sm text-center py-20">
            fetching your tickets...
          </p>
        )}

        {/* No Tickets State */}
        {!loading && tickets.length === 0 && (
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
                  <span
                    className={`font-mono text-[10px] tracking-[2px] uppercase px-2 py-1 ${getStatusStyle(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-white text-2xl leading-tight tracking-tight">
                  {ticket.eventId?.title || "Event"}
                </h3>

                {/* Date and Location */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <p className="font-mono text-[#AAAAAA] text-xs">
                    📅 {new Date(ticket.eventId?.date).toDateString()}
                  </p>
                  <p className="font-mono text-[#AAAAAA] text-xs">
                    📍 {ticket.eventId?.location}
                  </p>
                </div>
              </div>

              {/* Right — QR Code + Download */}
              <div className="flex flex-col items-center gap-4">
                {/* QR Code — show if exists otherwise placeholder */}
                {ticket.qrCode ? (
                  <img
                    src={ticket.qrCode}
                    alt="QR Code"
                    className="w-28 h-28 border border-[#2A2A2A]"
                  />
                ) : (
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
                )}

                {/* Download Button */}
                {/* Download Button */}
                <button
                  onClick={() =>
                    handleDownload(ticket.qrCode, ticket.eventId?.title)
                  }
                  disabled={!ticket.qrCode}
                  className={`w-full px-4 py-2 border font-mono text-[10px] tracking-widest transition-colors
        ${
          ticket.qrCode
            ? "border-[#2A2A2A] text-[#AAAAAA] hover:border-[#E88C3A] hover:text-[#E88C3A] cursor-pointer"
            : "border-[#2A2A2A] text-[#555555] cursor-not-allowed"
        }`}
                >
                  {ticket.qrCode ? "download →" : "pending..."}
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
  );
}

export default MyTicketsPage;
