'use client'
import { useState, useEffect } from 'react'

export default function TypeWriter({ text, speed = 50, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const startTyping = () => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, speed)
        return () => clearTimeout(timer)
      }
    }

    const initialDelay = setTimeout(startTyping, delay)
    return () => clearTimeout(initialDelay)
  }, [currentIndex, text, speed, delay])

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}