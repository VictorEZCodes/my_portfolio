import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import ThemeToggle from './components/ThemeToggle'
import CommandPalette from './components/CommandPalette'
import ShortcutIndicator from './components/ShortcutIndicator'
// import CustomCursor from './components/CustomCursor'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Victor Ezeanyika - Portfolio',
  description: 'Software Developer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function getInitialColorMode() {
                const persistedColorPreference = window.localStorage.getItem('theme');
                const hasPersistedPreference = typeof persistedColorPreference === 'string';
                if (hasPersistedPreference) {
                  return persistedColorPreference;
                }
                const mql = window.matchMedia('(prefers-color-scheme: dark)');
                const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                if (hasMediaQueryPreference) {
                  return mql.matches ? 'dark' : 'light';
                }
                return 'light';
              }
              const colorMode = getInitialColorMode();
              const root = document.documentElement;
              root.style.setProperty('--initial-color-mode', colorMode);
              if (colorMode === 'dark')
                document.documentElement.classList.add('dark');
            })()
          `
        }} />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300">
      <CommandPalette />
      <ShortcutIndicator />
      {/* <CustomCursor /> */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateColorMode(mode) {
                if (mode === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
              const root = document.documentElement;
              const initialColorMode = root.style.getPropertyValue('--initial-color-mode');
              updateColorMode(initialColorMode);
            })()
          `
        }} />
        <div className="min-h-screen bg-white dark:bg-[#121212] py-6 flex flex-col justify-center sm:py-12">
          <main className="relative py-3 sm:max-w-6xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white dark:bg-[#1E1E1E] shadow-lg sm:rounded-3xl sm:p-20 transition-colors duration-300">
              <div className="absolute top-4 right-4">
                <ThemeToggle />
              </div>
              <div className="max-w-5xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}