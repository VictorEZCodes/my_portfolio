'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true) // Show cursor when mouse moves
      
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      setIsPointer(
        window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer'
      )
    }

    const mouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseleave', mouseLeave)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseleave', mouseLeave)
    }
  }, [])

  if (!isVisible || !mousePosition) return null

  const mainCursor = {
    initial: { x: mousePosition.x - 8, y: mousePosition.y - 8 },
    animate: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: isPointer ? 1.5 : 1
    }
  }

  const trailCursor = {
    initial: { x: mousePosition.x - 16, y: mousePosition.y - 16 },
    animate: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: isPointer ? 1.2 : 1
    }
  }

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        initial={mainCursor.initial}
        animate={mainCursor.animate}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "linear"
        }}
      />

      <motion.div
        className="fixed w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9998]"
        initial={trailCursor.initial}
        animate={trailCursor.animate}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "linear"
        }}
      />
    </>
  )
}