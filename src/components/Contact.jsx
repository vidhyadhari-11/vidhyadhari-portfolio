import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { personalInfo } from '../data/portfolioData'

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [status, setStatus] = useState('IDLE') // IDLE | SENDING | SUCCESS | ERROR

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
        { opacity: 0, y: 25 },
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('SENDING')

    // If EmailJS keys are provided in .env, attempt live transmission
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
        setStatus('SUCCESS')
        formRef.current.reset()
      } catch (err) {
        console.error('EmailJS transmission failed:', err)
        setStatus('ERROR')
      }
    } else {
      // Simulation mode for initial setup
      setTimeout(() => {
        setStatus('SUCCESS')
        if (formRef.current) formRef.current.reset()
      }, 1000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 border-t border-bone/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="contact-anim mb-14 flex items-center justify-between border-b border-bone/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              05 // TRANSMISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-bone tracking-tight font-sans mt-1">
              INITIATE CONTACT
            </h2>
          </div>
          <span className="font-mono text-xs text-dim hidden sm:inline-block">
            DIRECT_CHANNEL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct channels */}
          <div className="contact-anim lg:col-span-5 space-y-6">
            <div className="border border-bone/10 bg-panel p-6 hud-frame">
              <span className="font-mono text-xs text-signal font-semibold block mb-2">
                DIRECT INBOX
              </span>
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="font-mono text-sm text-bone hover:text-signal break-all transition-colors"
              >
                {personalInfo.socials.email}
              </a>
              <p className="text-xs text-dim mt-2">
                Average transmission response time: &lt; 24 hours.
              </p>
            </div>

            <div className="border border-bone/10 bg-panel p-6 hud-frame">
              <span className="font-mono text-xs text-signal font-semibold block mb-3">
                EXTERNAL NODES
              </span>
              <div className="space-y-2 font-mono text-xs">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 border border-bone/10 text-bone hover:text-signal hover:border-signal transition-colors"
                >
                  <span>GITHUB // SOURCE</span>
                  <span>↗</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 border border-bone/10 text-bone hover:text-signal hover:border-signal transition-colors"
                >
                  <span>LINKEDIN // NETWORK</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Terminal Form */}
          <div className="contact-anim lg:col-span-7">
            <div className="border border-bone/10 bg-panel p-8 hud-frame">
              <div className="font-mono text-xs text-dim border-b border-bone/10 pb-3 mb-6 flex justify-between">
                <span>COMM_TERMINAL // SECURE_PORT</span>
                <span>STATUS: {status}</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="user_name" className="block font-mono text-xs text-bone mb-1">
                    IDENTITY // SENDER_NAME *
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    placeholder="e.g. Commander Sarah"
                    className="w-full bg-ink border border-bone/15 px-4 py-2.5 text-bone font-mono text-sm focus:outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="block font-mono text-xs text-bone mb-1">
                    RETURN_CHANNEL // EMAIL_ADDRESS *
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    placeholder="sarah@organization.com"
                    className="w-full bg-ink border border-bone/15 px-4 py-2.5 text-bone font-mono text-sm focus:outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-bone mb-1">
                    TRANSMISSION_PAYLOAD // MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Input message payload..."
                    className="w-full bg-ink border border-bone/15 px-4 py-2.5 text-bone font-mono text-sm focus:outline-none focus:border-signal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className="w-full py-3 bg-signal text-ink font-mono font-semibold text-xs uppercase tracking-wider hover:bg-bone transition-colors disabled:opacity-50"
                >
                  {status === 'SENDING' ? 'TRANSMITTING...' : 'DISPATCH MESSAGE [SEND]'}
                </button>

                {status === 'SUCCESS' && (
                  <div className="p-3 border border-signal/40 bg-signal/10 text-signal font-mono text-xs">
                    ✓ TRANSMISSION RECEIVED // THANK YOU FOR REACHING OUT.
                  </div>
                )}
                {status === 'ERROR' && (
                  <div className="p-3 border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs">
                    ! TRANSMISSION ERROR // PLEASE REACH OUT DIRECTLY VIA EMAIL.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
