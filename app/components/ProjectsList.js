'use client'

import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Custom hook to track scroll direction
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("down")
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScroll ? "down" : "up"
      if (direction !== scrollDirection) {
        setScrollDirection(direction)
      }
      setLastScroll(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener("scroll", updateScrollDirection)
    return () => window.removeEventListener("scroll", updateScrollDirection)
  }, [scrollDirection, lastScroll])

  return scrollDirection
}

export default function ProjectsList({ projects }) {
  const scrollDirection = useScrollDirection()

  const getAnimationVariants = (index) => ({
    initial: {
      opacity: 0,
      y: scrollDirection === "down" ? 50 : -50,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={getAnimationVariants(index)}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: false,
            margin: "-100px",
            amount: 0.4
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.21, 1.11, 0.81, 0.99],
          }}
        >
          <div className="h-full">
            <ProjectCard project={project} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}