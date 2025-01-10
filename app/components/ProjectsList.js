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
      y: scrollDirection === "down" ? 20 : -20, 
      scale: 0.95 
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
          <div className="h-full">
            <ProjectCard project={project} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}