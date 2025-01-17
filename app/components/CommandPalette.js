'use client'
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const commands = [
    {
      id: 'home',
      name: 'Go to Home',
      shortcut: ['g', 'h'],
      action: () => {
        router.push('/')
        setIsOpen(false)
      }
    },
    {
      id: 'projects',
      name: 'View All Projects',
      shortcut: ['g', 'p'],
      action: () => {
        router.push('/projects')
        setIsOpen(false)
      }
    },
    {
      id: 'experience',
      name: 'View Experience',
      shortcut: ['g', 'e'],
      action: () => {
        router.push('/experience')
        setIsOpen(false)
      }
    },
    {
      id: 'theme',
      name: 'Toggle Theme',
      shortcut: ['ctrl', 't'],
      action: () => {
        document.documentElement.classList.toggle('dark')
        setIsOpen(false)
      }
    },
    {
      id: 'github',
      name: 'Visit GitHub',
      shortcut: ['g', 'g'],
      action: () => {
        window.open('https://github.com/VictorEZCodes', '_blank')
        setIsOpen(false)
      }
    },
    {
      id: 'linkedin',
      name: 'Visit LinkedIn',
      shortcut: ['g', 'l'],
      action: () => {
        window.open('https://www.linkedin.com/in/victorezeanyika', '_blank')
        setIsOpen(false)
      }
    },
    {
      id: 'linkedin',
      name: 'Visit Whatsapp',
      shortcut: ['g', 'w'],
      action: () => {
        window.open('https://wa.me/2349014839655', '_blank')
        setIsOpen(false)
      }
    },
    {
      id: 'linkedin',
      name: 'Visit X',
      shortcut: ['g', 'x'],
      action: () => {
        window.open('https://x.com/victoranyika_', '_blank')
        setIsOpen(false)
      }
    }
  ]

  // Filter commands based on search query
  const filteredCommands = query === ''
    ? commands
    : commands.filter((command) =>
        command.name.toLowerCase().includes(query.toLowerCase())
      )

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20">
        <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-xl bg-white dark:bg-[#1E1E1E] shadow-2xl ring-1 ring-black/5 transition-all">
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
            <input
              type="text"
              className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Search commands..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Commands list */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.map((command) => (
              <button
                key={command.id}
                className="flex w-full items-center gap-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors duration-200"
                onClick={command.action}
              >
                <CommandLineIcon className="h-5 w-5 flex-none text-gray-400 dark:text-gray-500" />
                <span className="flex-auto">{command.name}</span>
                {command.shortcut && (
                  <span className="flex-none text-xs text-gray-400 dark:text-gray-500">
                    {command.shortcut.join('+')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}