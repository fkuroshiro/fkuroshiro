// src/components/Preloader.tsx
import { useEffect, useState } from "react"

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2000)
    const hideTimer = setTimeout(() => setVisible(false), 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center bg-mauve-950"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.3s ease"
        }}
      >
        <img src="/logo.svg" alt="Logo" className="w-16 h-16 invert animate-pulse" />
      </div>

      <div
        className="fixed inset-0 z-999 flex items-center justify-center bg-mauve-950">

      </div>
  </>
  )
}