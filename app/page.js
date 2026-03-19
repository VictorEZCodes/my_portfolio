'use client'

import { useState, useEffect } from 'react'
import projects from '../data/projects.json'
import experiences from '../data/experiences.json'
import { FaWhatsapp, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import FloatingPreview from './components/FloatingPreview'
import WarpField from './components/WarpField'
import { useAudio } from './context/AudioContext'

const visibleProjects = projects.filter(p => !p.hidden)
const totalTech = [...new Set(projects.flatMap(p => p.techStack))].length

function formatDuration(duration) {
  const [start, end] = duration.split(" - ")
  const startDate = new Date(start)
  const endDate = end === "Present" ? new Date() : new Date(end)
  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 30
  const years = Math.floor(totalDays / 365)
  const months = Math.floor((totalDays % 365) / 30)
  const parts = []
  if (years > 0) parts.push(`${years}yr`)
  if (months > 0) parts.push(`${months}mo`)
  return parts.join(" ")
}

function Waveform() {
  const { playing } = useAudio()
  const [barWidth, setBarWidth] = useState(3)

  useEffect(() => {
    setBarWidth(window.innerWidth >= 640 ? 4 : 3)
  }, [])

  const barPattern = [3,5,8,4,10,7,12,6,9,14,8,11,5,13,7,10,4,12,8,15,6,11,9,7,13,5,10,8,14,6,12,9,7,11,4,8,13,6,10,15]

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-64 flex items-center justify-center">
      {/* Ethereal glow behind waveform */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,160,255,0.1) 0%, rgba(123,94,167,0.05) 40%, transparent 70%)' }}
      />

      <div className="flex items-center gap-[3px] sm:gap-1 h-full">
        {barPattern.map((h, i) => {
          const maxH = playing ? h * 6 : h * 2.5
          const delay = i * 0.06

          return (
            <div
              key={i}
              className={`rounded-full transition-all ${
                playing
                  ? 'waveform-bar-active'
                  : 'bg-space-300/30 dark:bg-space-600/20'
              }`}
              style={{
                width: barWidth,
                height: playing ? undefined : `${h * 2.5}px`,
                animationDelay: playing ? `${delay}s` : undefined,
                '--bar-height': `${maxH}px`,
                background: playing
                  ? `linear-gradient(to top, #E8B86D, #C9A0FF)`
                  : undefined,
              }}
            />
          )
        })}
      </div>

      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-widest transition-opacity duration-500 ${
        playing ? 'text-glow opacity-100' : 'text-space-600 dark:text-space-400 opacity-60'
      }`}>
        {playing ? 'NOW PLAYING' : 'PRESS PLAY'}
      </div>
    </div>
  )
}

function TrackRow({ number, project, onHover, onLeave }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={project.link || '#'} target="_blank" rel="noopener noreferrer">
      <div
        className="track-row flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer group"
        onMouseEnter={() => { setHovered(true); onHover(project.imageUrl) }}
        onMouseLeave={() => { setHovered(false); onLeave() }}
      >
        <span className="w-8 text-right text-sm tabular-nums text-space-600 dark:text-space-400 group-hover:text-glow transition-colors">
          {String(number).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate group-hover:text-glow transition-colors">
            {project.title}
          </p>
          <p className="text-xs text-space-700 dark:text-space-300 truncate">
            {project.techStack.slice(0, 3).join(' / ')}
          </p>
        </div>

        <span className="text-xs text-space-600 dark:text-space-400 tabular-nums hidden sm:block">
          {project.techStack.length} tools
        </span>

        <span className={`text-glow text-sm transition-all duration-200 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          ↗
        </span>
      </div>
    </Link>
  )
}

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setFeaturedProjects([...visibleProjects].sort(() => Math.random() - 0.5).slice(0, 8))
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window))
  }, [])

  const socials = [
    { icon: FaWhatsapp, href: "https://wa.me/2349014839655", label: "WhatsApp" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/victorezeanyika", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/VictorEZCodes", label: "GitHub" },
    { icon: FaXTwitter, href: "https://x.com/victoranyika_", label: "X" },
  ]

  return (
    <div className="min-h-screen">
      {/* === HERO === */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <WarpField />

        <div className="max-w-7xl mx-auto px-6 w-full py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-sm text-space-600 dark:text-space-400 mb-4 tracking-wide">
                FULLSTACK DEVELOPER — LAGOS, NIGERIA
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
                <span className="block">Victor</span>
                <span className="block bg-gradient-to-r from-glow to-glow-warm bg-clip-text text-transparent">Ezeanyika</span>
              </h1>
              <p className="text-space-600 dark:text-space-300 max-w-md text-base leading-relaxed mb-8">
                I build things for the web — from full-stack apps to blockchain solutions.
                Currently engineering at PayOnUs and running GlitchLabs.
              </p>

              <div className="flex items-center gap-4">
                {socials.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-space-600 dark:text-space-400 hover:text-glow transition-colors duration-200"
                      whileHover={{ y: -2 }}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Waveform />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs text-space-600 dark:text-space-400 tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-glow/40 to-transparent" />
        </motion.div>
      </section>

      {/* === STATS STRIP === */}
      <section className="border-y border-space-200/50 dark:border-space-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="flex items-center justify-center gap-8 sm:gap-16 py-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[
              { value: visibleProjects.length, label: 'Projects' },
              { value: `${totalTech}+`, label: 'Technologies' },
              { value: experiences.length, label: 'Roles' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-glow to-glow-warm bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-space-700 dark:text-space-300 tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === TRACKLIST === */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-space-700 dark:text-space-300 tracking-widest mb-1">TRACKLIST</p>
                <h2 className="text-2xl font-bold">Featured Projects</h2>
              </div>
              <Link
                href="/projects"
                className="text-sm text-space-700 dark:text-space-300 hover:text-glow transition-colors"
              >
                View all {visibleProjects.length} →
              </Link>
            </div>

            <div className="h-px bg-space-200 dark:bg-space-800 mb-2" />

            <div>
              {featuredProjects.map((project, i) => (
                <TrackRow
                  key={project.id}
                  number={i + 1}
                  project={project}
                  onHover={(img) => isDesktop && setPreviewImage(img)}
                  onLeave={() => setPreviewImage(null)}
                />
              ))}
            </div>

            <div className="h-px bg-space-200 dark:bg-space-800 mt-2" />
          </motion.div>
        </div>
      </section>

      {/* === EXPERIENCE === */}
      <section className="py-24 bg-space-100/50 dark:bg-space-900/30 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs text-space-700 dark:text-space-300 tracking-widest mb-1">LINER NOTES</p>
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              <Link
                href="/experience"
                className="text-sm text-space-700 dark:text-space-300 hover:text-glow transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <div key={exp.id} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-glow mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(201,160,255,0.4)]" />
                    {i < experiences.length - 1 && (
                      <div className="w-px flex-1 bg-space-200 dark:bg-space-800 my-1" />
                    )}
                  </div>

                  <div className="pb-10">
                    <div className="flex items-center gap-3 mb-1">
                      {exp.imageUrl && (
                        <Image
                          src={exp.imageUrl}
                          alt={exp.company}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <h3 className="font-semibold text-base">
                        {exp.title}
                        <span className="text-space-700 dark:text-space-300 font-normal"> at </span>
                        {exp.company === "GlitchLabs" ? (
                          <span className="glitch-text" data-text="GlitchLabs">GlitchLabs</span>
                        ) : (
                          <span className="text-glow">{exp.company}</span>
                        )}
                      </h3>
                    </div>
                    <p className="text-xs text-space-700 dark:text-space-300 mb-2">
                      {exp.duration} <span className="text-glow font-semibold">· {formatDuration(exp.duration)}</span> — {exp.location}
                    </p>
                    <p className="text-sm text-space-600 dark:text-space-300 leading-relaxed mb-3">
                      {exp.description[0]}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-0.5 rounded bg-space-200/50 dark:bg-space-800/50 text-space-600 dark:text-space-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-16 border-t border-space-200/50 dark:border-space-800/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-space-700 dark:text-space-300 mb-4">Get in touch</p>
          <div className="flex justify-center gap-6 mb-6">
            {socials.map((social, i) => {
              const Icon = social.icon
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-space-600 dark:text-space-400 hover:text-glow transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
          <p className="text-xs text-space-600 dark:text-space-400">
            Victor Ezeanyika — Lagos, Nigeria
          </p>
        </div>
      </footer>

      <FloatingPreview imageUrl={previewImage} visible={!!previewImage} />
    </div>
  )
}
