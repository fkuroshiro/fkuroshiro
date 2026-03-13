// src/components/Hero.tsx
import { useEffect, useState } from "react"
import Wrapper from './Wrapper'
import HeroBackground from '../assets/hero_bg.jpg'
import DownArrow from '../assets/down_arrow.svg'

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
      style={{ backgroundImage: `url(${HeroBackground})` }}
      className="relative w-full h-screen bg-cover bg-center flex justify-center align-middle"
      id='hero-section'
    >
      <div className="absolute inset-0 bg-linear-to-t from-mauve-950 from-15% z-10" />

      <Wrapper>
        <div className="relative z-40 flex flex-col items-center justify-center h-screen text-center">

          <h1 className="text-5xl font-bold text-white">
            Hi, I'm{" "}
            <span className="text-purple-700">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Scroll down arrow */}
          <button
            onClick={scrollDown}
            className="absolute bottom-10 text-white text-2xl animate-bounce cursor-pointer"
          >
            <img src={DownArrow} className="invert w-16" />
          </button>

        </div>
      </Wrapper>
    </section>
  )
}