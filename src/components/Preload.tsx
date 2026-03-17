// src/components/Preloader.tsx
import { useEffect, useState } from "react"

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000)
    const hideTimer = setTimeout(() => setVisible(false), 1500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-ctp-base"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 1s ease", pointerEvents: fading ? "none" : "all" }}
    >
      <img src="/logo.svg" alt="Logo" className="w-16 h-16 invert animate-pulse" />
    </div>
  )
}