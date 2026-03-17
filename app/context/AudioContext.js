'use client'

import { createContext, useContext, useState } from 'react'

const AudioCtx = createContext({ playing: false, setPlaying: () => {} })

export function AudioProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  return (
    <AudioCtx.Provider value={{ playing, setPlaying }}>
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  return useContext(AudioCtx)
}
