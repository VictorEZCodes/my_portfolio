'use client'
import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function ScrollArrow() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("down")
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if page is scrolled more than 100px
      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection("up")
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollY])

  const scrollToPosition = () => {
    const position = scrollDirection === "up" ? 0 : document.documentElement.scrollHeight
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToPosition}
      className={`fixed z-50 p-2 rounded-full bg-gray-200/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 
      transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg backdrop-blur-sm
      ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      bottom-24 left-4 sm:bottom-20 lg:bottom-20
      `}
    >
      {scrollDirection === "up" ? (
        <ArrowUpIcon className="h-6 w-6 animate-bounce" />
      ) : (
        <ArrowDownIcon className="h-6 w-6 animate-bounce" />
      )}
    </button>
  )
}