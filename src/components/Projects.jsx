import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { projects } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

// Resolve project image covers dynamically with import.meta.glob
const projectImages = import.meta.glob('../assets/projects/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const getCover = (id) => {
  const match = Object.keys(projectImages).find((path) => path.includes(id))
  return match ? projectImages[match] : null
}

function ProjectCard({ project }) {
  const cover = getCover(project.id)

  return (
    <article
      data-cursor="hot"
      className="group border border-bone/10 bg-panel/60 w-full md:w-[min(560px,42vw)] shrink-0 flex flex-col justify-between"
    >
      {/* Top Cover Area */}
      <div className="aspect-[16/10] md:aspect-[16/8] border-b border-bone/10 bg-ink overflow-hidden relative">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full hud-grid flex items-center justify-center font-mono text-xs text-dim uppercase tracking-widest">
            // {project.id}
          </div>
        )}

        {/* Number / Year Badge */}
        <div className="absolute top-3 left-3 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
          {project.number} / {project.year}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-bone font-sans">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-bone/70 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-signal text-ink hover:bg-bone transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 inline-flex items-center"
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-bone/30 hover:border-signal hover:text-signal transition-colors font-mono text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2.5 inline-flex items-center text-bone"
              >
                Code ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const getDistance = () => track.scrollWidth - window.innerWidth + 80

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full overflow-hidden py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center md:pt-20 md:pb-6 relative"
    >
      {/* Header Row */}
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 shrink-0">
        <div>
          <ScrambleText
            trigger="view"
            text="02 / Selected work"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal block mb-1"
          />
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-bone font-sans">
            Projects
          </h2>
        </div>

        <div className="font-mono text-xs text-dim hidden md:block uppercase tracking-[0.18em]">
          {projects.length} projects · scroll →
        </div>
      </div>

      {/* Projects Track (Vertical stack on mobile, horizontal row on desktop) */}
      <div
        ref={trackRef}
        className="flex flex-col gap-6 md:flex-row md:w-max md:gap-8 px-5 md:px-10 will-change-transform"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Desktop Progress Line */}
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 mt-8 hidden md:block shrink-0">
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
