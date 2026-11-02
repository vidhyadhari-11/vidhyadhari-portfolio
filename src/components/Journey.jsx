import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function Journey() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const lineFillRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const list = listRef.current
      const lineFill = lineFillRef.current
      if (!list || !lineFill) return

      // Animate vertical signal line filling with scroll
      gsap.fromTo(
        lineFill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )

      // Per-item trigger: fade in from x: 30 and activate square node on scroll fill
      const items = list.querySelectorAll('.journey-entry')
      items.forEach((item) => {
        // Entrance animation
        gsap.fromTo(
          item,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          }
        )

        // Node activation trigger
        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%',
          onEnter: () => item.classList.add('is-on'),
          onLeaveBack: () => item.classList.remove('is-on'),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="px-5 md:px-10 py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: Sticky Header */}
        <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
          <ScrambleText
            trigger="view"
            text="03 / Journey"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone font-sans">
            Where I've been learning and building.
          </h2>
        </div>

        {/* RIGHT COLUMN: Interactive Timeline */}
        <div className="relative">
          <ol ref={listRef} className="relative pl-10 space-y-16 list-none">
            {/* Background 1px base line */}
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px bg-bone/15 pointer-events-none"
              aria-hidden="true"
            />

            {/* Foreground filling signal line */}
            <div
              ref={lineFillRef}
              className="absolute left-[7px] top-3 bottom-3 w-px bg-signal origin-top pointer-events-none will-change-transform"
              style={{ transformOrigin: 'top center' }}
              aria-hidden="true"
            />

            {experience.map((item, index) => (
              <li
                key={index}
                className="journey-entry relative space-y-3 transition-colors [&.is-on_.node]:bg-signal [&.is-on_.node]:scale-100"
              >
                {/* 15px Square Node Indicator */}
                <div
                  className="node absolute left-[-40px] top-1.5 w-[15px] h-[15px] border border-signal bg-ink scale-75 transition-all duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Period */}
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
                  {item.period}
                </div>

                {/* Role */}
                <h3 className="text-2xl md:text-3xl font-bold text-bone font-sans tracking-tight">
                  {item.role}
                </h3>

                {/* Organisation */}
                <div className="font-mono text-sm text-signal font-medium">
                  {item.org}
                </div>

                {/* Description */}
                <p className="text-bone/70 leading-relaxed font-sans text-sm md:text-base max-w-2xl">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}
