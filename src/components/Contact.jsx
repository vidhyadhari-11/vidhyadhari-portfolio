import { useState, useRef } from 'react'
import { personalInfo, socialLinks, contactContent, emailjsConfig } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [errorDetail, setErrorDetail] = useState('')
  const [fallbackPayload, setFallbackPayload] = useState(null)
  const timerRef = useRef(null)

  const firstName = (personalInfo.name || 'user').trim().split(/\s+/)[0].toLowerCase()

  const setTimedStatus = (newStatus) => {
    setStatus(newStatus)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (newStatus === 'success') {
      timerRef.current = setTimeout(() => {
        setStatus(null)
      }, 5000)
    }
  }

  const openMailtoFallback = (name, email, message) => {
    const subject = encodeURIComponent('Portfolio Contact')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const name = formData.get('user_name') || ''
    const email = formData.get('user_email') || ''
    const message = formData.get('message') || ''

    setFallbackPayload({ name, email, message })

    const { serviceId, templateId, publicKey } = emailjsConfig
    const isConfigured = Boolean(
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'
    )

    if (!isConfigured) {
      openMailtoFallback(name, email, message)
      setTimedStatus('success')
      formRef.current.reset()
      return
    }

    try {
      setStatus('sending')
      setErrorDetail('')
      const emailjs = await import('@emailjs/browser')

      // Send with comprehensive template parameter aliases to match any EmailJS template schema
      const templateParams = {
        user_name: name,
        from_name: name,
        name: name,
        user_email: email,
        from_email: email,
        email: email,
        reply_to: email,
        message: message,
        to_name: personalInfo.name,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setTimedStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS transmission error:', err)
      const detail = err?.text || err?.message || 'EmailJS service unavailable'
      setErrorDetail(detail)
      setTimedStatus('error')
    }
  }

  const socials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((s) => Boolean(s.url))

  return (
    <section id="contact" className="hud-grid px-5 md:px-10 py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        
        {/* LEFT COLUMN: Dossier & Direct Lines */}
        <div className="space-y-8">
          <div className="space-y-4">
            <ScrambleText
              trigger="view"
              text={contactContent.label || '04 / Contact'}
              className="font-mono text-xs uppercase tracking-[0.3em] text-signal block"
            />
            <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-bone font-sans">
              {contactContent.heading}
            </h2>
          </div>

          <p className="text-lg text-bone/70 max-w-md leading-relaxed font-sans">
            {contactContent.note}
          </p>

          {/* Email Channel */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim block">
              // DIRECT INBOX
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-lg md:text-2xl underline decoration-signal decoration-2 underline-offset-8 text-bone hover:text-signal transition-colors break-all inline-block"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* Phone Channel (if configured) */}
          {personalInfo.phone && (
            <div className="font-mono text-sm text-dim">
              TEL: {personalInfo.phone}
            </div>
          )}

          {/* Social Links */}
          <div className="pt-4 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim block">
              // NETWORKS
            </span>
            <div className="flex flex-wrap gap-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-dim hover:text-signal transition-colors"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Terminal Command Form */}
        <div>
          <div className="hud-frame border border-bone/10 bg-ink/70 backdrop-blur p-6 md:p-10 space-y-6 relative">
            
            {/* Terminal Header Line */}
            <div className="font-mono text-xs text-dim flex items-center gap-1.5 pb-2 border-b border-bone/10">
              <span className="text-signal font-bold">$</span>
              <span>new message --to {firstName}</span>
            </div>

            {/* Input Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Name */}
              <div className="space-y-1">
                <label htmlFor="user_name" className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                  &gt; name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal focus:outline-none focus:ring-0 text-bone placeholder:text-dim/50 font-mono text-sm py-2.5 transition-colors"
                />
              </div>

              {/* Field 2: Email */}
              <div className="space-y-1">
                <label htmlFor="user_email" className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                  &gt; email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal focus:outline-none focus:ring-0 text-bone placeholder:text-dim/50 font-mono text-sm py-2.5 transition-colors"
                />
              </div>

              {/* Field 3: Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                  &gt; message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className="w-full bg-transparent border-0 border-b border-bone/20 focus:border-signal focus:outline-none focus:ring-0 text-bone placeholder:text-dim/50 font-mono text-sm py-2.5 resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-signal text-ink hover:bg-bone transition-colors font-mono text-xs font-semibold uppercase tracking-[0.25em] px-6 py-4 flex items-center justify-between disabled:opacity-50"
              >
                <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                <span>→</span>
              </button>

              {/* Status & Error Feedback */}
              <div role="status" className="font-mono text-xs min-h-[1.5rem]">
                {status === 'success' && (
                  <span className="text-emerald-400">✓ Message sent. Talk soon.</span>
                )}
                {status === 'error' && (
                  <div className="space-y-2">
                    <p className="text-red-400">
                      ✕ Transmission failed: {errorDetail || 'EmailJS rejected request.'}
                    </p>
                    {fallbackPayload && (
                      <button
                        type="button"
                        onClick={() => openMailtoFallback(fallbackPayload.name, fallbackPayload.email, fallbackPayload.message)}
                        className="text-signal underline hover:text-bone text-xs font-mono transition-colors block text-left"
                      >
                        Click here to dispatch directly via your Email app ↗
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
