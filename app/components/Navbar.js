'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SunIcon, MoonIcon, HomeIcon, FolderIcon, BriefcaseIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import { useAudio } from '../context/AudioContext'

function Equalizer() {
  const { playing } = useAudio()

  return (
    <span className="inline-flex items-end gap-[2px] h-4 ml-2">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`w-[3px] rounded-full transition-all duration-300 ${
            playing ? `bg-glow animate-eq-${i}` : 'h-[4px] bg-space-400'
          }`}
        />
      ))}
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'))
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
  ]

  const mobileLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/projects', label: 'Projects', icon: FolderIcon },
    { href: '/experience', label: 'Experience', icon: BriefcaseIcon },
    { href: '/victorezeanyika.pdf', label: 'Resume', icon: DocumentTextIcon, external: true },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-50/80 dark:bg-space-950/80 backdrop-blur-md border-b border-space-200/50 dark:border-space-800/50'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-sm font-semibold text-space-800 dark:text-space-200 group-hover:text-glow transition-colors">
              Victor E.
            </span>
            <Equalizer />
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-glow font-semibold'
                    : 'text-space-500 dark:text-space-400 hover:text-space-800 dark:hover:text-space-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/victorezeanyika.pdf"
              target="_blank"
              className="hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-md border border-space-300 dark:border-space-700 text-space-600 dark:text-space-300 hover:border-glow hover:text-glow transition-all duration-200"
            >
              Resume
            </a>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-space-500 dark:text-space-400 hover:text-glow transition-colors"
            >
              {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="sm:hidden fixed bottom-14 left-0 right-0 z-50 bg-space-50/90 dark:bg-space-950/90 backdrop-blur-md border-t border-space-200/50 dark:border-space-800/50">
        <div className="flex items-center justify-around h-12">
          {mobileLinks.map(link => {
            const Icon = link.icon
            const active = pathname === link.href

            if (link.external) {
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-0.5 text-space-400 dark:text-space-600 transition-colors">
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px]">{link.label}</span>
                </a>
              )
            }

            return (
              <Link key={link.href} href={link.href}
                className={`flex flex-col items-center gap-0.5 transition-colors ${active ? 'text-glow' : 'text-space-400 dark:text-space-600'}`}>
                <Icon className={`h-4 w-4 ${active ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-[10px] ${active ? 'font-semibold' : ''}`}>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
