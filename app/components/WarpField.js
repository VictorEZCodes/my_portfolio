'use client'

import { useRef, useEffect } from 'react'
import { useAudio } from '../context/AudioContext'

export default function WarpField() {
  const canvasRef = useRef(null)
  const { playing } = useAudio()
  const playingRef = useRef(playing)
  const starsRef = useRef([])
  const rafRef = useRef(null)

  // Keep ref in sync
  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const STAR_COUNT = 500
    const MAX_DEPTH = 1000

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Init stars
    if (starsRef.current.length === 0) {
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: (Math.random() - 0.5) * MAX_DEPTH,
          y: (Math.random() - 0.5) * MAX_DEPTH,
          z: Math.random() * MAX_DEPTH,
          size: 0.3 + Math.random() * 0.7,
        })
      }
    }

    let lastTime = performance.now()

    function draw(now) {
      const dt = (now - lastTime) / (1000 / 60)
      lastTime = now

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const cx = w / 2
      const cy = h / 2
      const isPlaying = playingRef.current

      // Speed: faster when music plays
      const speed = isPlaying ? 3.5 * dt : 0.6 * dt
      const warpLength = isPlaying ? 8 : 2
      const maxLineWidth = isPlaying ? 2.5 : 1.2

      // Clear
      ctx.globalAlpha = 1
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i]

        // Move star toward viewer
        s.z -= speed
        if (s.z < 1) {
          s.z = MAX_DEPTH
          s.x = (Math.random() - 0.5) * MAX_DEPTH
          s.y = (Math.random() - 0.5) * MAX_DEPTH
        }

        // Project to 2D
        const x = (s.x / s.z) * cx + cx
        const y = (s.y / s.z) * cy + cy
        const size = (s.size * (MAX_DEPTH - s.z)) / MAX_DEPTH * 2.5

        // Skip if offscreen
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue
        if (size < 0.2) continue

        // Alpha based on depth
        const alpha = ((MAX_DEPTH - s.z) / MAX_DEPTH)
        ctx.globalAlpha = Math.min(alpha * 1.2, 1)

        // Warp trail: draw line from current pos to where it was
        const x2 = (s.x / (s.z + warpLength * speed)) * cx + cx
        const y2 = (s.y / (s.z + warpLength * speed)) * cy + cy

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = Math.min(size, maxLineWidth)
        ctx.lineCap = 'round'

        // Color: purple-white when playing, faint white when idle
        if (isPlaying) {
          const t = alpha
          const r = Math.round(201 + (255 - 201) * t)
          const g = Math.round(160 + (255 - 160) * t)
          const b = 255
          ctx.strokeStyle = `rgb(${r},${g},${b})`
        } else {
          ctx.strokeStyle = `rgba(200, 190, 255, ${alpha * 0.5})`
        }
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
