'use client'

import ExperienceCard from './ExperienceCard'
import { motion } from 'framer-motion'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useState } from 'react'

export default function ExperiencesList({ experiences }) {
  const scrollDirection = useScrollDirection()
  const [expandedId, setExpandedId] = useState(null)

  const getAnimationVariants = (index) => ({
    initial: {
      opacity: 0,
      y: scrollDirection === "down" ? 20 : -20,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  })

  const handleExpand = (id) => {
    setExpandedId(prevId => prevId === id ? null : id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto items-start">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          className="h-fit"
          variants={getAnimationVariants(index)}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
            margin: "0px",
            amount: 0.3
          }}
          transition={{
            duration: 0.4,
            delay: Math.min(index * 0.05, 0.3),
            ease: "easeOut"
          }}
        >
          <ExperienceCard 
            experience={experience} 
            isExpanded={expandedId === experience.id}
            onExpand={() => handleExpand(experience.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}