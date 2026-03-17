// src/components/Navbar.tsx
import { useState, useEffect } from "react"
import Wrapper from "./Wrapper"
import HamburgerMenu from "../assets/hamburger_menu.svg"

const navLinks = [
  { label: "Home", href: "/#hero-section" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "Anime", href: "/anime" },
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
      className={`fixed flex justify-center w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ctp-mantle/80 backdrop-blur-md shadow-2xl shadow-ctp-crust"
          : "bg-transparent"
      }`}
    >
      <Wrapper>
        <div className="h-16 flex items-center justify-between md:grid md:grid-cols-3">

          {/* Left — logo + nick */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="w-8 h-8 invert" alt="logo" />
            <span className="font-bold tracking-wide text-ctp-text">
              fkuroshiro
            </span>
          </div>

          {/* Center — nav links */}
          <ul className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    active === link.label
                      ? "text-ctp-mauve"
                      : "text-ctp-subtext hover:text-ctp-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-ctp-mauve transition-all duration-300 ${
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
              className="hidden md:block text-sm text-ctp-subtext hover:text-ctp-text transition-colors duration-200"
            >
              bobruskadominik@gmail.com
            </a>
            <button className="md:hidden">
              <img src={HamburgerMenu} className="w-8 invert" alt="menu" />
            </button>
          </div>

        </div>
      </Wrapper>
    </nav>
  )
}