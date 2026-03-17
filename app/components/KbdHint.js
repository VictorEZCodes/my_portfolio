'use client'

import { useState, useEffect } from 'react'

export default function KbdHint() {
  const [visible, setVisible] = useState(true)
  const [isMac, setIsMac] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window || navigator.maxTouchPoints > 0))

    // Auto-hide after 6 seconds
    const timer = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  if (!isDesktop || !visible) return null

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 px-3 py-1.5 text-xs
      text-warm-400 dark:text-warm-600
      bg-warm-100/80 dark:bg-warm-900/80 rounded-md backdrop-blur-sm
      border border-warm-200/50 dark:border-warm-800/50
      animate-[fadeIn_0.3s_ease-out] cursor-pointer
      hover:text-warm-600 dark:hover:text-warm-400 transition-colors"
      onClick={() => setVisible(false)}
    >
      <kbd className="font-semibold text-glow">{isMac ? '\u2318' : 'Ctrl'}</kbd>
      <kbd className="font-semibold text-glow">K</kbd>
      <span className="ml-1 opacity-70">to navigate</span>
    </div>
  )
}
