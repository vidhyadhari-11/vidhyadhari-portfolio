import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { projects } from '../data/portfolioData'

// Dynamically discover project screenshots
const projectImages = import.meta.glob('../assets/projects/*', { eager: true, query: '?url', import: 'default' })

const getProjectImage = (id) => {
  const match = Object.keys(projectImages).find((path) => path.includes(id))
  return match ? projectImages[match] : null
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
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
    <section id="projects" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 border-t border-bone/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex items-center justify-between border-b border-bone/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              03 // ARTIFACTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-bone tracking-tight font-sans mt-1">
              FEATURED PROJECTS
            </h2>
          </div>
          <span className="font-mono text-xs text-dim hidden sm:inline-block">
            DEPLOYED: {projects.length} UNITS
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const imgUrl = getProjectImage(project.id)
            return (
              <div
                key={project.id}
                className="project-card border border-bone/10 bg-panel flex flex-col justify-between hud-frame group hover:border-signal/50 transition-colors duration-200"
              >
                {/* Project Image / Visual Placeholder */}
                <div className="relative aspect-16/9 bg-ink/70 border-b border-bone/10 overflow-hidden flex items-center justify-center">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center hud-grid">
                      <div className="text-xs font-mono text-signal mb-1">
                        [SYS_IMG // {project.index}]
                      </div>
                      <div className="text-sm font-sans font-medium text-bone">
                        {project.title}
                      </div>
                      <div className="text-[10px] font-mono text-dim mt-2">
                        Place asset in <code>src/assets/projects/{project.id}.png</code>
                      </div>
                    </div>
                  )}
                  {/* Top-right index badge */}
                  <div className="absolute top-3 right-3 bg-ink/90 border border-bone/10 px-2 py-0.5 font-mono text-[10px] text-bone">
                    SYS.NO_{project.index}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-bone font-sans group-hover:text-signal transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-signal mt-1">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-dim leading-relaxed mt-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-6 pt-4 border-t border-bone/10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-mono border border-bone/15 bg-ink/40 text-bone"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-4 font-mono text-xs">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-signal hover:underline flex items-center space-x-1"
                      >
                        <span>DEPLOYMENT</span>
                        <span>↗</span>
                      </a>
                      <span className="text-dim/40">|</span>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bone hover:text-signal transition-colors flex items-center space-x-1"
                      >
                        <span>SOURCE_CODE</span>
                        <span>›</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
