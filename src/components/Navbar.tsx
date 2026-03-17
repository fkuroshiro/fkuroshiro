// src/components/Navbar.tsx
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Wrapper from "./Wrapper"
import HamburgerMenu from "../assets/hamburger_menu.svg"
import CloseSvg from "../assets/close.svg"

const navLinks = [
  { label: "Home", href: "/#hero-section" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "Anime", href: "/anime" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Determine active link based on current route
  const getActive = () => {
    if (location.pathname === "/anime") return "Anime"
    return "Home"
  }

  const [active, setActive] = useState(getActive)

  useEffect(() => {
    setActive(getActive())
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const handleLinkClick = (label: string) => {
    setActive(label)
    setMenuOpen(false)
  }

  return (
    <>
      {/* Main navbar */}
      <nav
        className={`fixed flex flex-col w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ctp-mantle/80 backdrop-blur-md border-b border-ctp-surface1 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-center w-full">
          <Wrapper>
            <div className="h-16 flex items-center justify-between md:grid md:grid-cols-3">

              {/* Left — logo + nick */}
              <div className="flex items-center gap-3">
                <img src="/logo.svg" className="w-8 h-8 invert" alt="logo" />
                <span className="font-bold tracking-wide text-ctp-text">
                  fkuroshiro
                </span>
              </div>

              {/* Center — nav links desktop */}
              <ul className="hidden md:flex items-center justify-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link.label)}
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
                <button
                  className="md:hidden"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label="Toggle menu"
                >
                  <img src={HamburgerMenu} className="w-8 invert" alt="menu" />
                </button>
              </div>

            </div>
          </Wrapper>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed inset-0 z-999 flex flex-col bg-ctp-base transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center h-16 px-6 border-b border-ctp-surface1 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="w-8 h-8 invert" alt="logo" />
            <span className="font-bold tracking-wide text-ctp-text">fkuroshiro</span>
          </div>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <img src={CloseSvg} className="w-8 invert" alt="close" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col items-center justify-center flex-1 gap-6">
          {navLinks.map((link, i) => (
            <li
              key={link.label}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            >
              <a
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                className={`text-2xl font-bold transition-colors duration-200 ${
                  active === link.label
                    ? "text-ctp-mauve"
                    : "text-ctp-subtext hover:text-ctp-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom email */}
        <div className="pb-12 flex justify-center">
          <a
            href="mailto:bobruskadominik@gmail.com"
            className="text-sm text-ctp-subtext hover:text-ctp-text transition-colors duration-200"
          >
            bobruskadominik@gmail.com
          </a>
        </div>
      </div>
    </>
  )
}