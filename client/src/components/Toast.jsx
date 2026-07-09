import { useEffect } from "react"

function Toast({ message, type, onClose }) {

  useEffect(() => {
    let timer = setTimeout(() => {
      onClose()
    }, 3000) // auto close after 3 seconds
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 font-mono text-sm border transition-all duration-300
      ${type === "success"
        ? "bg-[#1A3A1A] border-[#4CAF50] text-[#4CAF50]"
        : type === "error"
        ? "bg-[#2A1A1A] border-[#FF4444] text-[#FF4444]"
        : "bg-[#1A1A1A] border-[#E88C3A] text-[#E88C3A]"
      }`}
    >
      {/* Icon */}
      <span>
        {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </span>

      {/* Message */}
      <span>{message}</span>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="ml-4 text-current opacity-60 hover:opacity-100 cursor-pointer"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast