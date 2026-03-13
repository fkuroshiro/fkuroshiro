import Preload from './components/Preload'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
// import Footer from './components/Footer'
// import About from './components/About'
// import Projects from './components/Projects'
// import ContactForm from './components/ContactForm'
import Reconstruction from './components/Reconstruction'

export default function App() {

  return (
    <>
      <Preload></Preload>
      <Navbar></Navbar>
      <main>
        <Hero></Hero>
        <Reconstruction></Reconstruction>
      </main>
    </>
  )
}