import { personalInfo, socialLinks, navLinks, footerContent, academy } from '../data/portfolioData'

export default function Footer() {
  // Build "Elsewhere" list, skipping any empty URLs
  const elsewhere = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((s) => Boolean(s.url))

  const year = new Date().getFullYear()

  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 px-5 md:px-10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto">

        {/* Three-column link grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">

          {/* Column 1 – Navigate */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.15em] text-bone/75 hover:text-signal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 – Elsewhere */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {elsewhere.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.15em] text-bone/75 hover:text-signal transition-colors"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Say hello (right-aligned on md+) */}
          <div className="md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4">
              Say hello
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-xs text-bone/75 hover:text-signal transition-colors block break-all"
            >
              {personalInfo.email}
            </a>
            <p className="font-mono text-xs text-dim mt-1">{personalInfo.city}</p>
          </div>
        </div>

        {/* Giant brand watermark */}
        <div
          aria-hidden="true"
          className="text-center text-[13.5vw] font-bold leading-none tracking-[-0.05em] text-bone/[0.07] uppercase whitespace-nowrap select-none -mx-5 md:-mx-10 overflow-hidden mb-4"
        >
          {personalInfo.brandName}
        </div>

        {/* Bottom row – copyright + TAP Academy credit */}
        <div className="border-t border-bone/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-dim">
          <span>
            © {year} {personalInfo.name} · {footerContent.tagline}
          </span>
          <span>
            Trained at{' '}
            <a
              href={academy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dim hover:text-signal hover:decoration-signal transition-colors"
            >
              {academy.name}
            </a>
          </span>
        </div>

      </div>
    </footer>
  )
}
