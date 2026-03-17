'use client'

import { AudioProvider, useAudio } from '../context/AudioContext'
import Navbar from './Navbar'
import CommandPalette from './CommandPalette'
import PageTransition from './PageTransition'
import KbdHint from './KbdHint'
import AudioPlayer from './AudioPlayer'

function LayoutInner({ children }) {
  const { setPlaying } = useAudio()

  return (
    <>
      <CommandPalette />
      <Navbar />
      <KbdHint />
      <main className="pb-14 sm:pb-14 max-sm:pb-28">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <AudioPlayer onPlayStateChange={setPlaying} />
    </>
  )
}

export default function LayoutClient({ children }) {
  return (
    <AudioProvider>
      <LayoutInner>{children}</LayoutInner>
    </AudioProvider>
  )
}
