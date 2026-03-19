'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export default function AudioPlayer({ onPlayStateChange }) {
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const tryAutoplay = () => {
      audio.play().then(() => {
        setPlaying(true)
        onPlayStateChange?.(true)
      }).catch(() => {
        const playOnInteraction = () => {
          audio.play().then(() => {
            setPlaying(true)
            onPlayStateChange?.(true)
          }).catch(() => {})
          document.removeEventListener('click', playOnInteraction)
          document.removeEventListener('touchstart', playOnInteraction)
          document.removeEventListener('keydown', playOnInteraction)
        }
        document.addEventListener('click', playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
        document.addEventListener('keydown', playOnInteraction, { once: true })
      })
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration)
      setLoaded(true)
    }
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)

    if (audio.readyState >= 2) {
      tryAutoplay()
    } else {
      audio.addEventListener('canplay', tryAutoplay, { once: true })
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
    onPlayStateChange?.(!playing)
  }, [playing, onPlayStateChange])

  const seek = (e) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar) return
    const rect = bar.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const pct = x / rect.width
    audio.currentTime = pct * audio.duration
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-space-100/90 dark:bg-space-900/90 backdrop-blur-md border-t border-space-200/50 dark:border-space-800/50">
      <audio ref={audioRef} src="/audio/audio.mp3" preload="metadata" loop />

      <div
        ref={progressRef}
        className="absolute top-0 left-0 right-0 h-1 -translate-y-full cursor-pointer group"
        onClick={seek}
      >
        <div className="absolute inset-0 bg-space-200/50 dark:bg-space-800/50" />
        <div
          className="absolute top-0 left-0 h-full transition-[width] duration-100"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #C9A0FF, #E8B86D)' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-glow opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(201,160,255,0.5)]"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-glow text-space-950 hover:scale-105 transition-transform shadow-[0_0_12px_rgba(201,160,255,0.3)]"
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <rect x="0" y="0" width="4" height="14" rx="1" />
              <rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <path d="M0 0.5C0 0.2 0.3 0 0.5 0.1L11.5 6.6C11.8 6.8 11.8 7.2 11.5 7.4L0.5 13.9C0.3 14 0 13.8 0 13.5V0.5Z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">Now Playing</p>
          <p className="text-[10px] text-space-700 dark:text-space-300 truncate">Portfolio Vibes</p>
        </div>

        <span className="text-[10px] tabular-nums text-space-600 dark:text-space-400 hidden sm:block">
          {fmt(currentTime)} / {fmt(duration)}
        </span>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-space-600 dark:text-space-400 hover:text-glow transition-colors"
          >
            {muted || volume === 0 ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value)
              setVolume(v)
              setMuted(v === 0)
              if (audioRef.current) audioRef.current.volume = v
            }}
            className="w-16 h-1 accent-[#C9A0FF] bg-space-200 dark:bg-space-800 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-glow"
          />
        </div>
      </div>
    </div>
  )
}
