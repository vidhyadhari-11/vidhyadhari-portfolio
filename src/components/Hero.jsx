import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { personalInfo, heroContent } from '../data/portfolioData'

export default function Hero() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Three.js Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Geometry & Materials
    const geometry = new THREE.IcosahedronGeometry(1.8, 2)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8a8f98,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const mesh = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(mesh)

    const innerGeometry = new THREE.TorusGeometry(1.2, 0.02, 16, 100)
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5b1f,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const innerRing = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerRing)

    const outerRingGeometry = new THREE.RingGeometry(2.3, 2.34, 64)
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8e6df,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
    })
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial)
    scene.add(outerRing)

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xff5b1f,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
    })
    const points = new THREE.Points(geometry, pointsMaterial)
    scene.add(points)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      const width = canvas.parentElement.clientWidth
      const height = canvas.parentElement.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    if (containerRef.current) observer.observe(containerRef.current)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrameId = null

    const animate = () => {
      if (isVisible && !prefersReducedMotion) {
        mesh.rotation.x += 0.0015
        mesh.rotation.y += 0.002
        innerRing.rotation.x -= 0.003
        innerRing.rotation.z += 0.002
        outerRing.rotation.z += 0.001
        renderer.render(scene, camera)
      } else if (isVisible) {
        renderer.render(scene, camera)
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          once: true,
        }
      )
    }, contentRef)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)

      // Three.js cleanup
      geometry.dispose()
      wireframeMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      outerRingGeometry.dispose()
      outerRingMaterial.dispose()
      pointsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 hud-grid overflow-hidden"
    >
      {/* 3D Wireframe Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-70">
        <canvas ref={canvasRef} className="w-full h-full max-w-4xl max-h-[800px]" />
      </div>

      {/* Main HUD Card */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl w-full p-8 sm:p-12 border border-bone/10 bg-panel/80 backdrop-blur-md hud-frame"
      >
        {/* Status Bar */}
        <div className="hero-anim flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 pb-4 mb-8 text-xs font-mono">
          <div className="flex items-center space-x-2 text-signal">
            <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
            <span className="font-semibold tracking-wider">// {heroContent.eyebrow}</span>
          </div>
          <div className="text-dim">
            AVAILABILITY: <span className="text-bone">{personalInfo.availability}</span>
          </div>
        </div>

        {/* Identity & Intro */}
        <div className="space-y-4 max-w-3xl">
          <p className="hero-anim text-xs font-mono uppercase tracking-[0.2em] text-signal">
            // FULL-STACK ENGINEER
          </p>
          <h1 className="hero-anim text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-bone leading-none uppercase">
            {personalInfo.name}
          </h1>
          <h2 className="hero-anim text-xl sm:text-2xl font-mono text-dim font-light">
            {personalInfo.role}
          </h2>
          <p className="hero-anim text-base sm:text-lg text-bone/90 leading-relaxed pt-2">
            {heroContent.intro}
          </p>
        </div>

        {/* Action Controls & Info */}
        <div className="hero-anim mt-10 pt-6 border-t border-bone/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={heroContent.ctaPrimary.href}
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider bg-signal text-ink font-semibold hover:bg-bone transition-colors"
            >
              {heroContent.ctaPrimary.label}
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors"
            >
              {heroContent.ctaSecondary.label}
            </a>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-dim">
            <div>
              <span className="block text-bone font-medium">LOCATION</span>
              <span>{personalInfo.city}</span>
            </div>
            <div>
              <span className="block text-bone font-medium">STATUS</span>
              <span className="text-signal">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
