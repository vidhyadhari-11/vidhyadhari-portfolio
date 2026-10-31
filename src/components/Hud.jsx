import { useState, useEffect } from 'react'
import { navLinks, personalInfo } from '../data/portfolioData'

export default function Hud() {
  const [time, setTime] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-200">
      {/* Top HUD Telemetry Bar */}
      <div className="border-b border-bone/10 bg-ink/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs font-mono tracking-wider">
          {/* Left: Call sign & status */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse mr-2" />
              <span className="text-bone font-medium tracking-widest">{personalInfo.name.toUpperCase()}</span>
            </span>
            <span className="hidden sm:inline-block text-dim">//</span>
            <span className="hidden sm:inline-block text-dim">SYS.HUD_v4.2</span>
          </div>

          {/* Center: Desktop Navigation links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-dim hover:text-signal transition-colors duration-150 relative py-1 hover:border-b hover:border-signal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Live time & Coordinates */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-dim">
              <span>LOC: 12.97°N 77.59°E</span>
            </div>
            <div className="px-2 py-1 border border-bone/15 bg-panel text-bone">
              {time || '00:00:00 UTC'}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-dim hover:text-signal border border-bone/10"
              aria-label="Toggle navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-bone/10 bg-panel px-4 py-3 space-y-2 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-bone hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Decorative corner reticle marks when scrolled */}
      {isScrolled && (
        <div className="hidden lg:flex justify-between px-6 py-2 text-[10px] font-mono text-dim/60 pointer-events-none">
          <span>// STATUS: ACTIVE_MONITOR</span>
          <span>// FLUID_GRID_RENDER: ENGAGED</span>
        </div>
      )}
    </header>
  )
}
