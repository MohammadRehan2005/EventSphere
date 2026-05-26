import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function NotFoundPage() {
  let navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-40">

        {/* 404 */}
        <p className="font-mono text-[#2A2A2A] text-[120px] sm:text-[180px] font-bold leading-none mb-0">
          404
        </p>

        {/* Label */}
        <p className="font-mono text-[#AAAAAA] text-[10px] tracking-[4px] uppercase mb-4">
          / page not found
        </p>

        {/* Heading */}
        <h1 className="font-serif text-white text-3xl sm:text-4xl tracking-tight text-center mb-4">
          You look lost.
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-[#AAAAAA] text-sm text-center mb-12 max-w-sm leading-relaxed">
          the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-10 py-4 bg-[#E88C3A] text-[#0F0F0F] font-mono text-sm font-bold tracking-widest hover:bg-[#F09A4D] transition-colors cursor-pointer"
        >
          ← go back home
        </button>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] fixed bottom-0 w-full">
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

export default NotFoundPage