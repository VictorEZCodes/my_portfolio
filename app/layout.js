import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import PageTransition from './components/PageTransition'
import KbdHint from './components/KbdHint'
import AudioPlayer from './components/AudioPlayer'
import { AudioProvider } from './context/AudioContext'
import LayoutClient from './components/LayoutClient'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Victor Ezeanyika',
  description: 'FullStack Developer — Lagos, Nigeria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })()
          `
        }} />
      </head>
      <body className="bg-space-50 dark:bg-space-950 text-space-900 dark:text-space-100 transition-colors duration-300 min-h-screen">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}
