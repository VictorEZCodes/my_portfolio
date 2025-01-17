'use client'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue('--initial-color-mode');
    setDarkMode(initialColorValue === 'dark');

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <>
      {/* Original toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
        transition-all duration-300 hover:scale-110 hover:rotate-12"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 animate-spin-slow" />
        ) : (
          <MoonIcon className="h-6 w-6 animate-bounce-slow" />
        )}
      </button>

      {/* Sticky toggle that appears when scrolling */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed z-50 p-2 rounded-full bg-gray-200/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 
        transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg backdrop-blur-sm
        ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        bottom-24 right-4 sm:bottom-20 lg:bottom-20
        `}
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 animate-spin-slow" />
        ) : (
          <MoonIcon className="h-6 w-6 animate-bounce-slow" />
        )}
      </button>
    </>
  )
}