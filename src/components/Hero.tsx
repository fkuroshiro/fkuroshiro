// src/components/Hero.tsx
import { useEffect, useState } from "react"
import Wrapper from "./Wrapper"
import DownArrow from "../assets/down_arrow.svg"
import HeroCanvas from "./HeroCanvas"

const roles = ["fkuroshiro", "Web Developer", "Full Stack Dev", "UI Designer"]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = roles[currentRole]

    if (!deleting && displayed.length < full.length) {
      const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === full.length) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }
  }, [displayed, deleting, currentRole])

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-ctp-base"
      id="hero-section"
    >
      <HeroCanvas />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, #1e1e2e 100%)",
          zIndex: 1,
        }}
      />

      <Wrapper>
        <div className="relative flex flex-col items-center justify-center h-screen text-center" style={{ zIndex: 2 }}>

          <h1 className="text-5xl font-bold text-ctp-text">
            Hi, I'm{" "}
            <span className="text-ctp-mauve">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="mt-4 text-lg text-ctp-subtext">
            Developer & self-hosting enthusiast
          </p>

          <button
            onClick={scrollDown}
            className="absolute bottom-10 animate-bounce cursor-pointer"
          >
            <img src={DownArrow} className="w-16 invert" alt="scroll down" />
          </button>

        </div>
      </Wrapper>
    </section>
  )
}