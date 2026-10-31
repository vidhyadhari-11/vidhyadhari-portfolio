import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { personalInfo } from '../data/portfolioData'

export default function Hero() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Setup Three.js Scene
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

    // Create HUD Geometric Wireframe
    const geometry = new THREE.IcosahedronGeometry(1.8, 2)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8a8f98,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const mesh = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(mesh)

    // Inner Signal Core Ring
    const innerGeometry = new THREE.TorusGeometry(1.2, 0.02, 16, 100)
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5b1f,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const innerRing = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerRing)

    // Outer Reticle Ring
    const outerRingGeometry = new THREE.RingGeometry(2.3, 2.34, 64)
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8e6df,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
    })
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial)
    scene.add(outerRing)

    // Points at vertices
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

    // GSAP Entrance animation
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
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 hud-grid overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-70">
        <canvas ref={canvasRef} className="w-full h-full max-w-4xl max-h-[800px]" />
      </div>

      {/* Main HUD Frame Container */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl w-full p-8 sm:p-12 border border-bone/10 bg-panel/75 backdrop-blur-md hud-frame"
      >
        {/* Top Status Banner */}
        <div className="hero-anim flex flex-wrap items-center justify-between gap-2 border-b border-bone/10 pb-4 mb-8 text-xs font-mono">
          <div className="flex items-center space-x-2 text-signal">
            <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
            <span className="font-semibold tracking-wider">// SYSTEM READY</span>
          </div>
          <div className="text-dim">
            STATUS: <span className="text-bone">{personalInfo.status}</span>
          </div>
        </div>

        {/* Headline & Bio */}
        <div className="space-y-4 max-w-3xl">
          <p className="hero-anim text-xs font-mono uppercase tracking-[0.2em] text-signal">
            // OPERATIONAL PROFILE
          </p>
          <h1 className="hero-anim text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-bone leading-none">
            {personalInfo.name.toUpperCase()}
          </h1>
          <h2 className="hero-anim text-xl sm:text-2xl font-mono text-dim font-light">
            {personalInfo.title}
          </h2>
          <p className="hero-anim text-base sm:text-lg text-dim leading-relaxed pt-2">
            {personalInfo.subtitle}
          </p>
        </div>

        {/* Action Controls & Metric Badges */}
        <div className="hero-anim mt-10 pt-6 border-t border-bone/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider bg-signal text-ink font-semibold hover:bg-bone transition-colors"
            >
              EXPLORE PROJECTS [03]
            </a>
            <a
              href="#contact"
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors"
            >
              TRANSMIT MESSAGE
            </a>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-dim">
            <div>
              <span className="block text-bone font-medium">LOCATION</span>
              <span>{personalInfo.location}</span>
            </div>
            <div>
              <span className="block text-bone font-medium">TRAINING</span>
              <span>TAP ACADEMY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
