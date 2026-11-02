import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, aboutContent, skillGroups, academy } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// Resolve about portrait image dynamically with import.meta.glob
const portraitModules = import.meta.glob('../assets/about/about-portrait.*', { eager: true, query: '?url', import: 'default' })
const portraitUrl = Object.values(portraitModules)[0] || null

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in entrance for all animated blocks
      gsap.fromTo(
        '.about-anim',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Count-up animation for numeric stats (fires once)
      sectionRef.current.querySelectorAll('.stat-value').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const isDecimal = !Number.isInteger(target)
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.6,
            ease: 'power2.out',
            snap: { innerText: isDecimal ? 0.01 : 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
            onUpdate() {
              const raw = parseFloat(el.innerText)
              el.innerText = isDecimal ? raw.toFixed(2) : Math.round(raw).toString()
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 border-t border-bone/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="about-anim mb-12 flex items-center justify-between border-b border-bone/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              {aboutContent.label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-bone tracking-tight font-sans mt-1">
              {aboutContent.heading}
            </h2>
          </div>
          <span className="font-mono text-xs text-dim hidden sm:inline-block">
            DOC_REF: BIO_2026
          </span>
        </div>

        {/* Profile Grid: Portrait & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Portrait Column */}
          <div className="about-anim lg:col-span-5">
            <div className="relative border border-bone/15 bg-panel p-2 hud-frame aspect-4/5 flex items-center justify-center overflow-hidden">
              {portraitUrl ? (
                <img
                  src={portraitUrl}
                  alt="vidhyadhari — Java Full Stack Developer, TAP Academy student"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-dashed border-bone/20 bg-ink/50">
                  <div className="w-16 h-16 mb-4 rounded-full border border-signal/40 flex items-center justify-center text-signal">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-bone tracking-wider">PORTRAIT // PLACEHOLDER</span>
                  <span className="font-mono text-[10px] text-dim mt-2">
                    Place image in <code>src/assets/about/about-portrait.jpg</code>
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-ink/90 border border-bone/10 px-2 py-1 font-mono text-[10px] text-signal uppercase tracking-wider">
                {personalInfo.name}
              </div>
            </div>
          </div>

          {/* Bio & Stats Column */}
          <div className="about-anim lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-dim leading-relaxed text-base">
              <p>{aboutContent.paragraph}</p>
            </div>

            {/* Numeric Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-bone/10 py-6">
              {aboutContent.stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-signal">
                    {/* stat-value is animated by GSAP count-up; data-target holds the final number */}
                    <span
                      className="stat-value"
                      data-target={stat.value}
                    >
                      {stat.value}
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-xs font-mono text-dim mt-1 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Institution Highlight */}
            <div className="p-5 border border-bone/10 bg-panel/60 hud-frame">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-signal font-semibold tracking-wider">
                  PLACEMENT TRAINING
                </span>
                <span className="font-mono text-[10px] text-dim">VERIFIED</span>
              </div>
              <p className="text-sm text-bone">
                Undergoing specialized Java Full Stack & AI placement training at{' '}
                <a
                  href={academy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal underline hover:text-bone transition-colors"
                >
                  {academy.name}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Skill Groups Matrix */}
        <div className="about-anim">
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-2 h-2 bg-signal" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-bone">
              CORE TECHNICAL MODULES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map((group) => (
              <div key={group.title} className="border border-bone/10 bg-panel p-6 hud-frame">
                <div className="font-mono text-xs text-signal font-semibold border-b border-bone/10 pb-3 mb-4 uppercase">
                  // {group.title}
                </div>
                <ul className="space-y-2 font-mono text-xs text-bone">
                  {group.items.map((skill) => (
                    <li key={skill} className="flex items-center space-x-2">
                      <span className="text-signal/70">›</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
