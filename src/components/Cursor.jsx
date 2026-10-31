import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return finePointer && !prefersReducedMotion
  })

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('has-cursor')

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const renderLoop = () => {
      // Smooth interpolation for trailing ring
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animId = requestAnimationFrame(renderLoop)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animId = requestAnimationFrame(renderLoop)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Central precise signal dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#ff5b1f] will-change-transform"
      />
      {/* Outer technical HUD reticle ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-4 -mt-4 h-8 w-8 rounded-full border border-signal/40 will-change-transform transition-[width,height] duration-150"
      />
    </>
  )
}
