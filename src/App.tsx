import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AnimeList from "./pages/AnimeList"
//import Footer from "./components/Footer"
import Preloader from "./components/Preload"

export default function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<AnimeList />} />
        </Routes>
      </main>
    </>
  )
}