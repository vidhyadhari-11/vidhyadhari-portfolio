import { useState, useEffect } from 'react'
import { personalInfo, navLinks, heroContent } from '../data/portfolioData'

export default function Hud() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [time, setTime] = useState('')

  // Compute initials (e.g. "VI" or "VD")
  const brandInitials = (() => {
    const name = personalInfo.brandName || personalInfo.name || 'VH'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  })()

  useEffect(() => {
    // 24-hour clock formatter
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: personalInfo.timezone || 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        setTime(formatter.format(new Date()))
      } catch {
        setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
      }
    }

    updateTime()
    const clockInterval = setInterval(updateTime, 1000)

    // Cycle status lines every 3.5 seconds
    const statusInterval = setInterval(() => {
      if (heroContent.statusLines && heroContent.statusLines.length > 0) {
        setStatusIndex((prev) => (prev + 1) % heroContent.statusLines.length)
      }
    }, 3500)

    // Scroll listener for background blur & border
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearInterval(clockInterval)
      clearInterval(statusInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const currentStatus =
    heroContent.statusLines && heroContent.statusLines[statusIndex]
      ? heroContent.statusLines[statusIndex]
      : 'SYSTEM READY'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-ink/80 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
        {/* Left: Brand Badge & Title */}
        <a href="#home" aria-label={`${personalInfo.brandName || personalInfo.name} — back to top`} className="flex items-center space-x-3 group">
          <div className="w-8 h-8 flex items-center justify-center border border-signal font-mono text-xs font-semibold text-signal transition-colors group-hover:bg-signal group-hover:text-ink">
            {brandInitials}
          </div>
          <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-[0.2em] text-bone group-hover:text-signal transition-colors">
            {personalInfo.brandName || personalInfo.name}
          </span>
        </a>

        {/* Centre: Live Status Indicator (lg and up) */}
        <div
          className="hidden lg:flex items-center space-x-2.5"
          aria-live="polite"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {currentStatus}
          </span>
        </div>

        {/* Right: Navigation & Live Clock (md and up) */}
        <div className="hidden md:flex items-center space-x-6">
          <nav aria-label="Primary navigation" className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-bone/15" aria-hidden="true" />

          <time
            className="font-mono text-xs tabular-nums text-dim"
            title={personalInfo.timezone}
          >
            {time || '00:00:00'}
          </time>
        </div>

        {/* Mobile: Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-hud-menu"
          className="md:hidden font-mono text-xs uppercase tracking-[0.18em] text-bone hover:text-signal transition-colors px-2 py-1 border border-bone/15"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-hud-menu"
          className="md:hidden border-b border-bone/10 bg-ink/95 backdrop-blur-xl px-6 py-6 shadow-2xl"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold text-bone hover:text-signal border-b border-bone/10 py-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-6 flex items-center justify-between font-mono text-xs text-dim">
            <span className="uppercase">{personalInfo.city}</span>
            <time className="tabular-nums text-bone" title={personalInfo.timezone}>
              {time}
            </time>
          </div>
        </div>
      )}
    </header>
  )
}
