'use client'

import experiences from '../../data/experiences.json'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const formatDuration = (duration) => {
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

function ExperienceBlock({ experience, index }) {
  const [expanded, setExpanded] = useState(false)
  const duration = formatDuration(experience.duration)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-glow shadow-[0_0_8px_rgba(201,160,255,0.4)] mt-2 flex-shrink-0 ring-4 ring-space-50 dark:ring-space-950" />
          {index < experiences.length - 1 && (
            <div className="w-px flex-1 bg-space-200 dark:bg-space-800 my-1" />
          )}
        </div>

        {/* Content */}
        <div className="pb-14">
          {/* Role + company */}
          <div className="flex items-center gap-3 mb-2">
            {experience.imageUrl && (
              <Image
                src={experience.imageUrl}
                alt={experience.company}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {experience.title}
              </h3>
              <p className="text-sm">
                {experience.company === "GlitchLabs" ? (
                  <span className="glitch-text text-glow" data-text="GlitchLabs">GlitchLabs</span>
                ) : (
                  <span className="text-glow">{experience.company}</span>
                )}
                <span className="text-space-500 dark:text-space-500"> — {experience.location}</span>
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex gap-3 text-xs text-space-500 dark:text-space-500 mb-4">
            <span>{experience.duration}</span>
            <span className="text-glow font-semibold">{duration}</span>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            {experience.description.map((item, j) => (
              <p key={j} className="text-sm text-space-600 dark:text-space-400 leading-relaxed max-w-xl">
                {item}
              </p>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {experience.techStack.map((tech, j) => (
              <span
                key={j}
                className="text-xs px-2.5 py-1 rounded bg-space-200/50 dark:bg-space-800/50 text-space-600 dark:text-space-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-space-500 dark:text-space-500 tracking-widest mb-1">
            LINER NOTES
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Experience
          </h1>
          <p className="text-sm text-space-500 dark:text-space-500">
            The journey so far
          </p>
          <div className="h-px bg-space-200 dark:bg-space-800 mt-6" />
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceBlock key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
