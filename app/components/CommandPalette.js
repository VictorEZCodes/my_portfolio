'use client'
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const commands = [
    { id: 'home', name: 'Go Home', shortcut: ['g', 'h'], action: () => { router.push('/'); setIsOpen(false) } },
    { id: 'projects', name: 'All Projects', shortcut: ['g', 'p'], action: () => { router.push('/projects'); setIsOpen(false) } },
    { id: 'experience', name: 'Experience', shortcut: ['g', 'e'], action: () => { router.push('/experience'); setIsOpen(false) } },
    { id: 'theme', name: 'Toggle Theme', shortcut: ['ctrl', 't'], action: () => { document.documentElement.classList.toggle('dark'); setIsOpen(false) } },
    { id: 'github', name: 'GitHub', shortcut: ['g', 'g'], action: () => { window.open('https://github.com/VictorEZCodes', '_blank'); setIsOpen(false) } },
    { id: 'linkedin', name: 'LinkedIn', shortcut: ['g', 'l'], action: () => { window.open('https://www.linkedin.com/in/victorezeanyika', '_blank'); setIsOpen(false) } },
    { id: 'whatsapp', name: 'WhatsApp', shortcut: ['g', 'w'], action: () => { window.open('https://wa.me/2349014839655', '_blank'); setIsOpen(false) } },
    { id: 'x', name: 'X / Twitter', shortcut: ['g', 'x'], action: () => { window.open('https://x.com/victoranyika_', '_blank'); setIsOpen(false) } },
  ]

  const filtered = query === ''
    ? commands
    : commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(o => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-space-950/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20">
        <Dialog.Panel className="mx-auto max-w-md transform overflow-hidden rounded-xl bg-space-50 dark:bg-space-900 shadow-2xl border border-space-200 dark:border-space-800 transition-all">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-space-400" />
            <input
              type="text"
              className="h-11 w-full border-0 bg-transparent pl-10 pr-4 text-space-900 dark:text-space-100 placeholder:text-space-400 focus:ring-0 text-sm"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="border-t border-space-200 dark:border-space-800 max-h-72 overflow-y-auto">
            {filtered.map(cmd => (
              <button
                key={cmd.id}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-space-100 dark:hover:bg-space-800 transition-colors text-left"
                onClick={cmd.action}
              >
                <span className="flex-auto">{cmd.name}</span>
                <span className="text-xs text-space-400 tabular-nums">{cmd.shortcut.join('+')}</span>
              </button>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
