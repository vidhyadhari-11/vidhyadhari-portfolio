import { academy, personalInfo } from '../data/portfolioData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-bone/10 bg-panel text-dim font-mono text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: ID & Copyright */}
        <div className="flex items-center space-x-3">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="text-bone">{personalInfo.name.toUpperCase()}</span>
          <span>// © {currentYear} ALL RIGHTS RESERVED</span>
        </div>

        {/* Center: TAP Academy Credit (Mandatory) */}
        <div className="flex items-center space-x-2 text-center">
          <span className="text-dim">Trained at</span>
          <a
            href={academy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal hover:underline hover:text-bone font-medium transition-colors"
          >
            {academy.name}
          </a>
        </div>

        {/* Right: Technical HUD Coordinates & Back to top */}
        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline-block">SYS.STATE: OPTIMAL</span>
          <a
            href="#home"
            className="text-bone hover:text-signal border border-bone/15 px-2 py-1 transition-colors"
          >
            ▲ TOP
          </a>
        </div>
      </div>
    </footer>
  )
}
