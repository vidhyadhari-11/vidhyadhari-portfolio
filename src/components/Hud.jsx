import { useState, useEffect } from 'react'
import { navLinks, personalInfo, heroContent } from '../data/portfolioData'

export default function Hud() {
  const [time, setTime] = useState('')
  const [statusIndex, setStatusIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: personalInfo.timezone || 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
        setTime(`${formatted} IST`)
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    // Cycle through status lines periodically
    const statusTimer = setInterval(() => {
      if (heroContent.statusLines && heroContent.statusLines.length > 0) {
        setStatusIndex((prev) => (prev + 1) % heroContent.statusLines.length)
      }
    }, 4000)

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="border-b border-bone/10 bg-ink/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs font-mono tracking-wider">
          {/* Brand & Call Sign */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse mr-2" />
              <span className="text-bone font-medium tracking-widest uppercase">
                {personalInfo.brandName || personalInfo.name}
              </span>
            </span>
            <span className="hidden sm:inline-block text-dim">//</span>
            <span className="hidden sm:inline-block text-signal font-normal truncate max-w-xs">
              {heroContent.statusLines[statusIndex]}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dim hover:text-signal transition-colors duration-150 py-1 hover:border-b hover:border-signal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Location & Local Clock */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-dim text-[11px]">
              <span>{personalInfo.city.toUpperCase()}</span>
            </div>
            <div className="px-2.5 py-1 border border-bone/15 bg-panel text-bone">
              {time || '00:00:00 IST'}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-dim hover:text-signal border border-bone/10"
              aria-label="Toggle navigation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-bone/10 bg-panel px-4 py-3 space-y-2 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-bone hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
