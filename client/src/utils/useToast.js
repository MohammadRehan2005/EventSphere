import { useState } from "react"

export const useToast = () => {
    let [toast, setToast] = useState({ message: "", type: "" })

    let showToast = (message, type = "info") => {
        setToast({ message, type })
    }

    let hideToast = () => {
        setToast({ message: "", type: "" })
    }

    return { toast, showToast, hideToast }
}