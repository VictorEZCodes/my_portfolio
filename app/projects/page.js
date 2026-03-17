'use client'

import { useState, useEffect } from 'react'
import projects from '../../data/projects.json'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import FloatingPreview from '../components/FloatingPreview'

function ProjectRow({ project, index, onHover, onLeave }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2) }}
    >
      <div
        className="track-row rounded-lg cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => onHover(project.imageUrl)}
        onMouseLeave={onLeave}
      >
        {/* Main row */}
        <div className="flex items-center gap-4 px-4 py-4">
          <span className="w-8 text-right text-sm tabular-nums text-space-400 dark:text-space-600 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          {project.imageUrl && (
            <div className="w-10 h-10 relative rounded overflow-hidden flex-shrink-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">
              {project.title === "ChaoS/UI" || project.title === "GlitchLabs" ? (
                <span className="glitch-text" data-text={project.title}>{project.title}</span>
              ) : (
                project.title
              )}
              {project.favorite && (
                <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-glow" />
              )}
            </p>
            <p className="text-xs text-space-500 dark:text-space-500 truncate">
              {project.techStack.slice(0, 4).join(' / ')}
            </p>
          </div>

          <span className="text-xs text-space-400 dark:text-space-600 tabular-nums flex-shrink-0 hidden sm:block">
            {project.techStack.length} tools
          </span>

          <span className={`text-space-400 text-xs transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 pl-16">
                {project.imageUrl && (
                  <div className="w-full max-w-lg h-48 relative rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <p className="text-sm text-space-600 dark:text-space-400 leading-relaxed mb-4 max-w-xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded bg-space-200/50 dark:bg-space-800/50 text-space-600 dark:text-space-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-glow hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit project ↗
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [previewImage, setPreviewImage] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window))
  }, [])

  const visibleProjects = projects.filter(p => !p.hidden)

  const categories = {
    all: 'All',
    favorites: 'Favorites',
    frontend: 'Frontend',
    fullstack: 'Full-Stack',
    blockchain: 'Blockchain',
    ai: 'AI',
  }

  const filtered = visibleProjects.filter(p => {
    if (filter === 'all') return true
    if (filter === 'favorites') return p.favorite
    if (filter === 'blockchain') return p.techStack.some(t => ['Solidity', 'Web3.js', 'Ethers.js'].includes(t))
    if (filter === 'ai') return p.techStack.some(t => ['OpenAI API', 'HuggingFace', 'Claude API'].includes(t))
    if (filter === 'fullstack') return p.techStack.some(t => ['Node.js', 'Express', 'MongoDB', 'Express.js', 'PostgreSQL'].includes(t))
    if (filter === 'frontend') return p.techStack.some(t => ['React', 'Next.js', 'Vite'].includes(t)) && !p.techStack.some(t => ['Node.js', 'Express', 'MongoDB', 'Express.js'].includes(t))
    return true
  })

  // Count per category for labels
  const counts = Object.fromEntries(
    Object.keys(categories).map(key => {
      const count = visibleProjects.filter(p => {
        if (key === 'all') return true
        if (key === 'favorites') return p.favorite
        if (key === 'blockchain') return p.techStack.some(t => ['Solidity', 'Web3.js', 'Ethers.js'].includes(t))
        if (key === 'ai') return p.techStack.some(t => ['OpenAI API', 'HuggingFace', 'Claude API'].includes(t))
        if (key === 'fullstack') return p.techStack.some(t => ['Node.js', 'Express', 'MongoDB', 'Express.js', 'PostgreSQL'].includes(t))
        if (key === 'frontend') return p.techStack.some(t => ['React', 'Next.js', 'Vite'].includes(t)) && !p.techStack.some(t => ['Node.js', 'Express', 'MongoDB', 'Express.js'].includes(t))
        return true
      }).length
      return [key, count]
    })
  )

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-space-500 dark:text-space-500 tracking-widest mb-1">
            FULL TRACKLIST
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Projects
          </h1>
          <p className="text-sm text-space-500 dark:text-space-500">
            {visibleProjects.length} tracks — click any to expand
          </p>
        </motion.div>

        {/* Filters with counts */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                filter === key
                  ? 'bg-glow text-space-950 font-semibold'
                  : 'text-space-500 hover:text-space-800 dark:hover:text-space-200 border border-space-200 dark:border-space-800'
              }`}
            >
              {label}
              <span className="ml-1 opacity-60">{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-space-200 dark:bg-space-800 mb-1" />

        {/* Track list */}
        <div>
          {filtered.map((project, i) => (
            <ProjectRow
              key={project.id + '-' + project.title}
              project={project}
              index={i}
              onHover={(img) => isDesktop && setPreviewImage(img)}
              onLeave={() => setPreviewImage(null)}
            />
          ))}
        </div>

        <div className="h-px bg-space-200 dark:bg-space-800 mt-1" />

        {/* Stats */}
        <div className="mt-6 flex gap-8 text-xs text-space-400 dark:text-space-600">
          <span>{filtered.length} projects</span>
          <span>{[...new Set(filtered.flatMap(p => p.techStack))].length} technologies</span>
        </div>
      </div>

      {/* Floating preview on desktop */}
      <FloatingPreview imageUrl={previewImage} visible={!!previewImage} />
    </div>
  )
}
