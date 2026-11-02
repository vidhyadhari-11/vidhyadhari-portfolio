import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

// Resolve project cover images via import.meta.glob
const projectImages = import.meta.glob('../assets/projects/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const getCover = (id) => {
  const match = Object.keys(projectImages).find((path) => path.includes(id))
  return match ? projectImages[match] : null
}

// ---------------------------------------------------------------------------
// ProjectCard Component
// ---------------------------------------------------------------------------
function ProjectCard({ project, index, activeIndex, onFocus }) {
  const cover = getCover(project.id)
  const isFocused = activeIndex === index

  return (
    <article
      data-cursor="hot"
      onMouseEnter={() => onFocus(index)}
      className={`group border transition-all duration-300 bg-panel/80 shrink-0 flex flex-col justify-between select-none
        w-[85vw] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px]
        max-h-[min(580px,calc(100vh-200px))]
        snap-center
        ${
          isFocused
            ? 'border-signal/80 shadow-[0_0_25px_rgba(255,91,31,0.15)] scale-[1.01] z-10 opacity-100'
            : activeIndex !== null
            ? 'border-bone/10 opacity-55 hover:opacity-90 hover:border-bone/30'
            : 'border-bone/10 opacity-100 hover:border-signal/50'
        }
      `}
    >
      {/* Cover Image Area */}
      <div className="aspect-[16/9] md:aspect-[16/8.5] max-h-[220px] border-b border-bone/10 bg-ink overflow-hidden relative shrink-0">
        {cover ? (
          <img
            src={cover}
            alt={`${project.title} project screenshot`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full hud-grid flex items-center justify-center font-mono text-xs text-dim uppercase tracking-widest">
            // {project.id}
          </div>
        )}

        {/* Index / Year Badge */}
        <div className="absolute top-3 left-3 bg-ink/85 border border-bone/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal backdrop-blur-sm">
          {project.number} // {project.year}
        </div>

        {/* Active Focus Pill */}
        <div
          className={`absolute top-3 right-3 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-opacity duration-300 ${
            isFocused ? 'opacity-100 bg-signal text-ink font-semibold' : 'opacity-0'
          }`}
        >
          ACTIVE
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 md:p-6 lg:p-7 flex flex-col justify-between flex-1 space-y-4 overflow-hidden">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-bone font-sans line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-bone/70 leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-1">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-dim bg-ink/60 border border-bone/10 px-2 py-0.5"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-1 border-t border-bone/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — open live site`}
                className="bg-signal text-ink hover:bg-bone transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2 inline-flex items-center gap-1.5"
              >
                <span>Live</span>
                <span>↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — view source code`}
                className="border border-bone/25 hover:border-signal hover:text-signal transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2 inline-flex items-center gap-1.5 text-bone"
              >
                <span>Code</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Projects Main Section
// ---------------------------------------------------------------------------
export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [currentCard, setCurrentCard] = useState(0)

  // ---------------------------------------------------------------------------
  // Smooth Horizontal Scroll via GSAP ScrollTrigger (Desktop)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      // Compute total distance needed so that the very last card is fully revealed
      // with comfortable right padding inside the viewport
      const calculateDistance = () => {
        const totalTrackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return Math.max(0, totalTrackWidth - viewportWidth)
      }

      const distance = calculateDistance()
      if (distance <= 0) return

      const tween = gsap.to(track, {
        x: () => -calculateDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(distance, 900)}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
            // Update active index indicator based on scroll progress
            const cardCount = projects.length
            const active = Math.min(cardCount - 1, Math.floor(self.progress * cardCount))
            setCurrentCard(active)
          },
        },
      })

      scrollTriggerRef.current = tween.scrollTrigger
    })

    return () => mm.revert()
  }, [])

  // ---------------------------------------------------------------------------
  // Trackpad & Mouse Horizontal Wheel Handler
  // Converts horizontal gestures on the projects section into smooth page scroll
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e) => {
      // If user swipes horizontally on trackpad (dominant deltaX)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        window.scrollBy({
          top: e.deltaX * 1.2,
          behavior: 'auto',
        })
      }
    }

    section.addEventListener('wheel', handleWheel, { passive: true })
    return () => section.removeEventListener('wheel', handleWheel)
  }, [])

  // ---------------------------------------------------------------------------
  // Arrow Navigation: scroll cleanly to next / previous card
  // ---------------------------------------------------------------------------
  const navigateCard = (direction) => {
    const newIdx = Math.max(0, Math.min(projects.length - 1, currentCard + direction))
    setCurrentCard(newIdx)
    setActiveIndex(newIdx)

    const st = scrollTriggerRef.current
    if (st) {
      const targetProgress = newIdx / (projects.length - 1)
      const targetScroll = st.start + targetProgress * (st.end - st.start)
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
    } else if (trackRef.current) {
      // Mobile / tablet native scroll
      const cardEl = trackRef.current.children[newIdx]
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full relative overflow-hidden py-16 md:py-0 md:h-screen md:min-h-[640px] md:max-h-[1080px] md:flex md:flex-col md:justify-between"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Header Row: Title, Counter & Navigation Arrows                     */}
      {/* ----------------------------------------------------------------- */}
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pt-4 md:pt-10 mb-6 shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <ScrambleText
            trigger="view"
            text="02 / Selected work"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block mb-1"
          />
          <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-none tracking-[-0.03em] text-bone font-sans">
            Projects
          </h2>
        </div>

        {/* Status / Controls */}
        <div className="flex items-center gap-6">
          <div className="font-mono text-xs text-dim uppercase tracking-[0.18em]">
            <span className="text-signal font-semibold">0{currentCard + 1}</span> / 0
            {projects.length}
          </div>

          {/* Prev / Next controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateCard(-1)}
              disabled={currentCard === 0}
              aria-label="Previous project"
              className="w-8 h-8 flex items-center justify-center border border-bone/20 hover:border-signal text-bone hover:text-signal disabled:opacity-30 disabled:pointer-events-none transition-colors font-mono text-xs"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => navigateCard(1)}
              disabled={currentCard === projects.length - 1}
              aria-label="Next project"
              className="w-8 h-8 flex items-center justify-center border border-bone/20 hover:border-signal text-bone hover:text-signal disabled:opacity-30 disabled:pointer-events-none transition-colors font-mono text-xs"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Projects Track:                                                   */}
      {/* - Desktop: Translates smoothly with GSAP ScrollTrigger            */}
      {/* - Mobile: Smooth touch-friendly native horizontal snap carousel   */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex-1 flex items-center w-full overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory touch-pan-x">
        <div
          ref={trackRef}
          onMouseLeave={() => setActiveIndex(null)}
          className="flex flex-row gap-5 md:gap-8 lg:gap-10 pl-5 sm:pl-8 md:pl-10 lg:pl-16 pr-8 sm:pr-12 md:pr-32 lg:pr-48 w-max will-change-transform py-3"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              activeIndex={activeIndex}
              onFocus={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom Telemetry Strip & Progress Indicator (Desktop)              */}
      {/* ----------------------------------------------------------------- */}
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 pb-6 md:pb-8 pt-4 hidden md:block shrink-0">
        <div className="flex items-center justify-between text-dim font-mono text-[11px] uppercase tracking-[0.2em] mb-2">
          <span>// HORIZONTAL_ORBIT: SCROLL OR USE ARROWS</span>
          <span>{projects[currentCard]?.title.split('–')[0]?.trim()}</span>
        </div>
        <div className="h-[2px] w-full bg-bone/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full bg-signal origin-left scale-x-0 will-change-transform"
            style={{ transformOrigin: 'left center' }}
          />
        </div>
      </div>
    </section>
  )
}
