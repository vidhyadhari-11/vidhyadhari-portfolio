import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || prefersReducedMotion) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-cursor')

    // Initial positioning and opacity reveal
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
    })

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const handlePointerMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handlePointerOver = (e) => {
      const isInteractive = Boolean(
        e.target && e.target.closest('a, button, input, textarea, [data-cursor="hot"]')
      )

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: '#ff5b1f',
          duration: 0.25,
          ease: 'power2.out',
        })
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(232, 230, 223, 0.6)',
          duration: 0.25,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999] h-1.5 w-1.5 rounded-full bg-signal opacity-0 shadow-[0_0_8px_#ff5b1f]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999] h-9 w-9 rounded-full border border-bone/60 opacity-0"
      />
    </>
  )
}
