'use client'
import { useState, useEffect } from 'react'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export default function ShortcutIndicator() {
  const [isMac, setIsMac] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    
    const checkIfDesktop = () => {
      return window.innerWidth >= 1024 && 
        !('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    setIsDesktop(checkIfDesktop())

    // Update on resize
    const handleResize = () => {
      setIsDesktop(checkIfDesktop())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isDesktop) return null

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 
    bg-white/90 dark:bg-[#1E1E1E]/90 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <CommandLineIcon className="h-4 w-4" />
      <span>Press</span>
      <kbd className="font-sans font-semibold">
        {isMac ? '⌘' : 'Ctrl'}
      </kbd>
      <kbd className="font-sans font-semibold">K</kbd>
    </div>
  )
}