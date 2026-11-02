import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalInfo, heroContent } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

// Lazy load HeroScene so Three.js loads in its own bundle chunk
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const heroRef = useRef(null)
  const dividerRef = useRef(null)

  // Split name for dual typographic treatment (solid first word, outlined rest)
  const rawName = (personalInfo.name || 'VIDHYADHARI').trim()
  const nameParts = rawName.split(/\s+/)
  const firstWord = nameParts[0].length > 6 && nameParts.length === 1 
    ? nameParts[0].slice(0, 6).toUpperCase() 
    : nameParts[0].toUpperCase()
  const restWords = nameParts.length > 1 
    ? nameParts.slice(1).join(' ').toUpperCase() 
    : (rawName.length > 6 ? rawName.slice(6).toUpperCase() : '')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide up content
      gsap.fromTo(
        '[data-hero="fade"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.3,
        }
      )

      // Animate thin divider line scaling from left
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.2,
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative hud-grid min-h-screen flex flex-col justify-between overflow-hidden px-5 md:px-10 pt-24 pb-10"
    >
      {/* Central 2-Column Content Grid */}
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 my-auto">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="space-y-6">
          {/* Eyebrow */}
          <div data-hero="fade" className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
            {heroContent.eyebrow}
          </div>

          {/* Split Name Headline */}
          <h1 className="text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]">
            <ScrambleText
              trigger="mount"
              text={firstWord}
              delay={200}
              className="block text-bone"
            />
            {restWords && (
              <ScrambleText
                trigger="mount"
                text={restWords}
                delay={500}
                className="block text-transparent [-webkit-text-stroke:1.5px_#e8e6df]"
              />
            )}
          </h1>

          {/* Divider Line */}
          <div
            ref={dividerRef}
            className="h-px max-w-xl bg-bone/25 origin-left"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Role & Hero Intro */}
          <div data-hero="fade" className="space-y-2 max-w-xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
              {personalInfo.role}
            </div>
            <p className="text-lg md:text-xl text-bone/85 leading-relaxed font-sans">
              {heroContent.intro}
            </p>
          </div>

          {/* Square-cornered CTA Buttons */}
          <div data-hero="fade" className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={heroContent.ctaPrimary.href}
              className="bg-signal text-ink hover:bg-bone transition-colors font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 inline-flex items-center gap-2 group"
            >
              <span>{heroContent.ctaPrimary.label}</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="border border-bone/30 hover:border-signal hover:text-signal transition-colors font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 inline-block"
            >
              {heroContent.ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Signal Core Frame */}
        <div data-hero="fade" className="w-full">
          <div className="hud-frame relative border border-bone/10 bg-panel/40 h-[48vh] min-h-[320px] lg:h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Corner Indicators */}
            <div className="absolute top-3 left-3 pointer-events-none font-mono text-[10px] uppercase tracking-[0.25em] text-dim z-10">
              core.view — drag to rotate
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[10px] uppercase tracking-[0.25em] text-dim z-10">
              {personalInfo.city}
            </div>

            {/* Lazy 3D Scene */}
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </div>

      </div>

      {/* Bottom Telemetry Strip */}
      <div
        data-hero="fade"
        className="max-w-[1440px] w-full mx-auto mt-10 border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim flex items-center justify-between"
      >
        <div className="flex items-center">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse mr-2.5 inline-block" />
          <span>{personalInfo.availability}</span>
        </div>
        <div className="hidden sm:inline-block hover:text-signal transition-colors">
          Scroll ↓
        </div>
      </div>
    </section>
  )
}
