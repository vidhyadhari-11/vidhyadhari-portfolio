import { useState, useEffect, useRef } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/'

export default function ScrambleText({
  text = '',
  as: Tag = 'span',
  className = '',
  delay = 0,
  speed = 30,
  trigger = 'view',
}) {
  const [display, setDisplay] = useState(text)
  const elementRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    let intervalId = null
    let timeoutId = null
    let observer = null

    const playEffect = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      timeoutId = setTimeout(() => {
        let frame = 0
        const len = text.length

        intervalId = setInterval(() => {
          frame++
          const lockedChars = Math.floor(frame / 2)

          if (lockedChars >= len) {
            setDisplay(text)
            clearInterval(intervalId)
            return
          }

          let output = ''
          for (let i = 0; i < len; i++) {
            if (i < lockedChars) {
              output += text[i]
            } else if (text[i] === ' ') {
              output += ' '
            } else {
              output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }
          }
          setDisplay(output)
        }, speed)
      }, delay)
    }

    if (trigger === 'mount') {
      playEffect()
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playEffect()
            if (observer && elementRef.current) {
              observer.unobserve(elementRef.current)
            }
          }
        },
        { threshold: 0.4 }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      if (observer) observer.disconnect()
    }
  }, [text, delay, speed, trigger])

  return (
    <Tag ref={elementRef} aria-label={text} className={className}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
