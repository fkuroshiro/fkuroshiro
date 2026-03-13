// src/components/Navbar.tsx
import { useState, useEffect } from "react"
import Wrapper from "./Wrapper"
import HamburgerMenu from "../assets/hamburger_menu.svg"

const navLinks = [
  { label: "Home", href: "#hero-section" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("Home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed flex justify-center align-middle w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-mauve-950/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Wrapper>
        <div className="h-16 flex items-center justify-between md:grid md:grid-cols-3">

          {/* Left — logo + nick */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="w-8 h-8 invert" alt="logo" />
            <span className="text-white font-bold tracking-wide">fkuroshiro</span>
          </div>

          {/* Center — nav links */}
          <ul className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    active === link.label ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-purple-400 transition-all duration-300 ${
                      active === link.label ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Right — email + hamburger */}
          <div className="flex justify-end items-center gap-4">
            <a
              href="mailto:bobruskadominik@gmail.com"
              className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              bobruskadominik@gmail.com
            </a>
            <button className="md:hidden text-white text-xl"><img src={HamburgerMenu} className="invert w-8"/></button>
          </div>

        </div>
      </Wrapper>
    </nav>
  )
}