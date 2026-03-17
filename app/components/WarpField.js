'use client'

import { useRef, useEffect } from 'react'
import { useAudio } from '../context/AudioContext'

// Simple spaceship shapes drawn with canvas paths
function drawShip(ctx, x, y, size, angle, alpha, variant) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.globalAlpha = alpha

  if (variant === 0) {
    // Sleek fighter — triangle with wings
    ctx.beginPath()
    ctx.moveTo(size * 1.2, 0)
    ctx.lineTo(-size * 0.6, -size * 0.5)
    ctx.lineTo(-size * 0.3, 0)
    ctx.lineTo(-size * 0.6, size * 0.5)
    ctx.closePath()
    ctx.fillStyle = 'rgba(201, 160, 255, 0.7)'
    ctx.fill()

    // Engine glow
    ctx.beginPath()
    ctx.arc(-size * 0.5, 0, size * 0.2, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(232, 184, 109, 0.8)'
    ctx.fill()
  } else if (variant === 1) {
    // Small cruiser — elongated diamond
    ctx.beginPath()
    ctx.moveTo(size, 0)
    ctx.lineTo(0, -size * 0.3)
    ctx.lineTo(-size * 0.8, 0)
    ctx.lineTo(0, size * 0.3)
    ctx.closePath()
    ctx.fillStyle = 'rgba(180, 150, 230, 0.6)'
    ctx.fill()

    // Twin engines
    ctx.beginPath()
    ctx.arc(-size * 0.7, -size * 0.15, size * 0.1, 0, Math.PI * 2)
    ctx.arc(-size * 0.7, size * 0.15, size * 0.1, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(232, 184, 109, 0.9)'
    ctx.fill()
  } else {
    // Tiny shuttle — simple wedge
    ctx.beginPath()
    ctx.moveTo(size * 0.7, 0)
    ctx.lineTo(-size * 0.4, -size * 0.25)
    ctx.lineTo(-size * 0.4, size * 0.25)
    ctx.closePath()
    ctx.fillStyle = 'rgba(220, 200, 255, 0.5)'
    ctx.fill()

    // Engine
    ctx.beginPath()
    ctx.arc(-size * 0.35, 0, size * 0.08, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 200, 100, 0.8)'
    ctx.fill()
  }

  ctx.restore()
}

// Draw engine trail behind a ship
function drawTrail(ctx, x, y, angle, length, size, alpha) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  const gradient = ctx.createLinearGradient(-size * 0.5, 0, -length, 0)
  gradient.addColorStop(0, `rgba(232, 184, 109, ${alpha * 0.6})`)
  gradient.addColorStop(0.4, `rgba(201, 160, 255, ${alpha * 0.3})`)
  gradient.addColorStop(1, 'rgba(201, 160, 255, 0)')

  ctx.beginPath()
  ctx.moveTo(-size * 0.4, -size * 0.12)
  ctx.lineTo(-length, 0)
  ctx.lineTo(-size * 0.4, size * 0.12)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.restore()
}

export default function WarpField() {
  const canvasRef = useRef(null)
  const { playing } = useAudio()
  const playingRef = useRef(playing)
  const starsRef = useRef([])
  const shipsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const STAR_COUNT = 600
    const MAX_DEPTH = 1000

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

    // Init ships — they fly across the screen periodically
    if (shipsRef.current.length === 0) {
      for (let i = 0; i < 20; i++) {
        shipsRef.current.push(makeShip(canvas.clientWidth, canvas.clientHeight))
      }
    }

    function makeShip(w, h) {
      // Ships fly from random edges toward or across screen
      const side = Math.floor(Math.random() * 4)
      let sx, sy, angle
      if (side === 0) { sx = -60; sy = Math.random() * h; angle = (Math.random() - 0.5) * 0.6 }
      else if (side === 1) { sx = w + 60; sy = Math.random() * h; angle = Math.PI + (Math.random() - 0.5) * 0.6 }
      else if (side === 2) { sx = Math.random() * w; sy = -60; angle = Math.PI / 2 + (Math.random() - 0.5) * 0.6 }
      else { sx = Math.random() * w; sy = h + 60; angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6 }

      return {
        x: sx,
        y: sy,
        angle,
        speed: 1.5 + Math.random() * 2,
        size: 8 + Math.random() * 14,
        variant: Math.floor(Math.random() * 3),
        alpha: 0,
        fadeIn: true,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        delay: Math.random() * 400,
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

      // Speed
      const speed = isPlaying ? 6 * dt : 0.8 * dt
      const warpLength = isPlaying ? 12 : 2.5
      const maxLineWidth = isPlaying ? 3 : 1.2

      ctx.globalAlpha = 1
      ctx.clearRect(0, 0, w, h)

      // === STARS ===
      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i]

        s.z -= speed
        if (s.z < 1) {
          s.z = MAX_DEPTH
          s.x = (Math.random() - 0.5) * MAX_DEPTH
          s.y = (Math.random() - 0.5) * MAX_DEPTH
        }

        const x = (s.x / s.z) * cx + cx
        const y = (s.y / s.z) * cy + cy
        const size = (s.size * (MAX_DEPTH - s.z)) / MAX_DEPTH * 2.5

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue
        if (size < 0.2) continue

        const alpha = ((MAX_DEPTH - s.z) / MAX_DEPTH)
        ctx.globalAlpha = Math.min(alpha * 1.2, 1)

        const x2 = (s.x / (s.z + warpLength * speed)) * cx + cx
        const y2 = (s.y / (s.z + warpLength * speed)) * cy + cy

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = Math.min(size, maxLineWidth)
        ctx.lineCap = 'round'

        if (isPlaying) {
          const t = alpha
          const r = Math.round(201 + (255 - 201) * t)
          const g = Math.round(160 + (255 - 160) * t)
          ctx.strokeStyle = `rgb(${r},${g},255)`
        } else {
          ctx.strokeStyle = `rgba(200, 190, 255, ${alpha * 0.5})`
        }
        ctx.stroke()
      }

      // === SHIPS ===
      const shipSpeed = isPlaying ? 3.5 : 1.2
      for (let i = 0; i < shipsRef.current.length; i++) {
        const ship = shipsRef.current[i]

        if (ship.delay > 0) {
          ship.delay -= dt
          continue
        }

        ship.life += dt
        ship.x += Math.cos(ship.angle) * ship.speed * shipSpeed * dt
        ship.y += Math.sin(ship.angle) * ship.speed * shipSpeed * dt

        // Fade in/out
        if (ship.life < 30) {
          ship.alpha = Math.min(ship.life / 30, 0.9)
        } else if (ship.life > ship.maxLife - 40) {
          ship.alpha = Math.max((ship.maxLife - ship.life) / 40, 0)
        } else {
          ship.alpha = 0.9
        }

        // Draw trail first (behind ship)
        const trailLen = isPlaying ? ship.size * 5 : ship.size * 2
        drawTrail(ctx, ship.x, ship.y, ship.angle, trailLen, ship.size, ship.alpha)

        // Draw ship
        drawShip(ctx, ship.x, ship.y, ship.size, ship.angle, ship.alpha, ship.variant)

        // Respawn if dead or offscreen
        if (ship.life > ship.maxLife || ship.x < -100 || ship.x > w + 100 || ship.y < -100 || ship.y > h + 100) {
          shipsRef.current[i] = makeShip(w, h)
        }
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
