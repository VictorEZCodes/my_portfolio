'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false) 

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true) // Show cursor when mouse moves
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)
      setIsPointer(
        window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer'
      )
    }

    window.addEventListener('mousemove', (e) => {
      updateMousePosition(e)
      updateCursorType()
    })

    // Hide cursor when mouse leaves the window
    window.addEventListener('mouseout', () => setIsVisible(false))
    window.addEventListener('mouseleave', () => setIsVisible(false))

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseout', () => setIsVisible(false))
      window.removeEventListener('mouseleave', () => setIsVisible(false))
    }
  }, [mousePosition.x, mousePosition.y])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 0.8,
          stiffness: 300
        }}
      />
    </>
  )
}