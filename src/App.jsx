import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './components/Cursor'
import Hud from './components/Hud'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    // Initialize smooth Lenis scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Recalculate ScrollTrigger on window load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh()
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-ink text-bone font-sans antialiased selection:bg-signal selection:text-ink">
      <Cursor />
      <Hud />
      <main>
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
