import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { journey } from '../data/portfolioData'

export default function Journey() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 border-t border-bone/10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex items-center justify-between border-b border-bone/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              04 // TRAJECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-bone tracking-tight font-sans mt-1">
              ENGINEERING JOURNEY
            </h2>
          </div>
          <span className="font-mono text-xs text-dim hidden sm:inline-block">
            CHRONO_LOG
          </span>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-bone/15 pl-6 sm:pl-8 space-y-12 ml-2 sm:ml-4">
          {journey.map((item, index) => (
            <div key={index} className="journey-item relative">
              {/* Signal Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-ink border-2 border-signal flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-signal" />
              </div>

              {/* Card Container */}
              <div className="border border-bone/10 bg-panel p-6 hud-frame">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-bone/10 pb-3 mb-4">
                  <span className="font-mono text-xs text-signal font-semibold">
                    {item.period}
                  </span>
                  <span className="font-mono text-[10px] text-dim uppercase">
                    {item.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-bone font-sans">
                  {item.role}
                </h3>
                <div className="text-sm font-mono text-dim mt-0.5">
                  {item.organization}
                </div>

                <p className="text-sm text-dim leading-relaxed mt-4">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-bone/10 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-0.5 text-[10px] font-mono border border-bone/10 bg-ink/40 text-bone"
                      >
                        // {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
