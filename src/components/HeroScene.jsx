import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Setup Dimensions
    let width = container.clientWidth || 300
    let height = container.clientHeight || 300

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 7

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Main 3D Group
    const group = new THREE.Group()
    scene.add(group)

    // 1. Outer Shell: Edges of Icosahedron in signal orange (0xff5b1f)
    const shellGeo = new THREE.IcosahedronGeometry(1.9, 1)
    const shellEdges = new THREE.EdgesGeometry(shellGeo)
    const shellMat = new THREE.LineBasicMaterial({
      color: 0xff5b1f,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0,
    })
    const shellMesh = new THREE.LineSegments(shellEdges, shellMat)
    group.add(shellMesh)

    // 2. Inner Core: Points in bone (0xe8e6df)
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 4)
    const coreMat = new THREE.PointsMaterial({
      color: 0xe8e6df,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    })
    const corePoints = new THREE.Points(coreGeo, coreMat)
    group.add(corePoints)

    // 3. Orbit Ring: EllipseCurve tilted
    const ringCurve = new THREE.EllipseCurve(0, 0, 2.7, 2.7, 0, Math.PI * 2, false, 0)
    const ringPointsArr = ringCurve.getPoints(128)
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPointsArr)
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xe8e6df,
      transparent: true,
      opacity: 0.18,
    })
    const ringLoop = new THREE.LineLoop(ringGeo, ringMat)
    ringLoop.rotation.x = Math.PI / 2.4
    group.add(ringLoop)

    // Initial Scale for materialisation
    if (!prefersReducedMotion) {
      group.scale.set(0.6, 0.6, 0.6)
    }

    // Interaction State
    let mouseTargetX = 0
    let mouseTargetY = 0
    let dragDeltaX = 0
    let dragDeltaY = 0
    let isDragging = false
    let prevPointerX = 0
    let prevPointerY = 0
    let autoSpinY = 0

    // Pointer Move tilt calculation
    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = -(e.clientY / window.innerHeight) * 2 + 1
      mouseTargetY = normX * 0.4
      mouseTargetX = -normY * 0.25

      if (isDragging) {
        const dx = e.clientX - prevPointerX
        const dy = e.clientY - prevPointerY
        dragDeltaY += dx * 0.01
        dragDeltaX += dy * 0.01
        prevPointerX = e.clientX
        prevPointerY = e.clientY
      }
    }

    // Drag interaction on canvas
    const handlePointerDown = (e) => {
      isDragging = true
      prevPointerX = e.clientX
      prevPointerY = e.clientY
    }

    const handlePointerUp = () => {
      isDragging = false
    }

    renderer.domElement.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp)

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Pause rendering when off-screen
    let isVisible = true
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(container)

    // Animation variables
    let animId = null
    const startTime = performance.now()

    const animate = (currentTime) => {
      if (isVisible) {
        const elapsed = (currentTime - startTime) / 1000

        // Intro materialisation (over ~1 second)
        if (!prefersReducedMotion && elapsed < 1.2) {
          const progress = Math.min(1, elapsed / 1.0)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          const currentScale = 0.6 + 0.4 * easeOut
          group.scale.set(currentScale, currentScale, currentScale)
          shellMat.opacity = 0.9 * easeOut
        } else if (!prefersReducedMotion) {
          shellMat.opacity = 0.9
          group.scale.set(1, 1, 1)
        }

        // Auto spin and counter-rotation
        if (!prefersReducedMotion) {
          autoSpinY += 0.0025
          corePoints.rotation.y = -elapsed * 0.15
          ringLoop.rotation.z = elapsed * 0.05
        }

        // Ease group toward target rotation + drag offset (factor 0.06)
        const targetRotX = mouseTargetX + dragDeltaX
        const targetRotY = mouseTargetY + autoSpinY + dragDeltaY

        group.rotation.x += (targetRotX - group.rotation.x) * 0.06
        group.rotation.y += (targetRotY - group.rotation.y) * 0.06

        renderer.render(scene, camera)
      }
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    // Cleanup on unmount
    return () => {
      if (animId) cancelAnimationFrame(animId)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
      }

      // Dispose geometries and materials
      shellGeo.dispose()
      shellEdges.dispose()
      shellMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()

      // Dispose renderer
      renderer.dispose()
      renderer.forceContextLoss()

      // Remove canvas from DOM
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Interactive 3D shape — drag to rotate"
      data-cursor="hot"
    />
  )
}
