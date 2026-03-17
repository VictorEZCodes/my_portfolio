'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function FloatingPreview({ imageUrl, visible }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!visible) {
      setReady(false)
      return
    }

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!ready) setReady(true)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [visible, ready])

  if (!visible || !imageUrl || !ready) return null

  // Offset so it doesn't overlap the cursor
  const offsetX = 20
  const offsetY = -80

  return (
    <div
      ref={ref}
      className="project-preview fixed z-50 rounded-lg overflow-hidden shadow-2xl border border-warm-200/30 dark:border-warm-800/30"
      style={{
        left: pos.x + offsetX,
        top: pos.y + offsetY,
        opacity: ready ? 1 : 0,
        width: 280,
        height: 170,
      }}
    >
      <Image
        src={imageUrl}
        alt="Project preview"
        fill
        style={{ objectFit: 'cover' }}
        sizes="280px"
      />
    </div>
  )
}
