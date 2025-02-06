'use client'

import { useState, useEffect } from 'react'
import ProjectsList from './components/ProjectsList'
import ExperiencesList from './components/ExperienceList'
import projects from '../data/projects.json'
import experiences from '../data/experiences.json'
import { FaWhatsapp, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import SocialLinks from './components/SocialLinks'
import Image from 'next/image'
import TypeWriter from './components/TypeWriter'

export default function Home() {
  const previewExperiences = experiences.slice(0, 2)
  const [previewProjects, setPreviewProjects] = useState([])

  useEffect(() => {
    // Get 3 random projects everytime the page is loaded
    setPreviewProjects([...projects].sort(() => Math.random() - 0.5).slice(0, 3))
  }, [])

  return (
    <>
      <motion.div className="mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
          >
            <Image
              src="/images/profile.png"
              alt="Victor Ezeanyika"
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-lg"
              priority
            />
          </motion.div>
          <div>
            <motion.h1
              className="text-3xl font-bold mb-2 dark:text-white text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TypeWriter text="Victor Ezeanyika" speed={50} />
            </motion.h1>
            <motion.p
              className="dark:text-gray-300 text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TypeWriter text="FullStack Developer" speed={70} delay={500} />
            </motion.p>
          </div>
        </div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Resume Button */}
          <motion.a
            href="/victorezeanyika.pdf"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Resume
          </motion.a>

          {/* WhatsApp Link */}
          <motion.a
            href="https://wa.me/2349014839655"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 transition-colors"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp size={24} />
          </motion.a>

          {/* LinkedIn Link */}
          <motion.a
            href="https://www.linkedin.com/in/victorezeanyika"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={24} />
          </motion.a>

          {/* GitHub Link */}
          <motion.a
            href="https://github.com/VictorEZCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={24} />
          </motion.a>

          {/* X Link */}
          <motion.a
            href="https://x.com/victoranyika_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaXTwitter size={22} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Experience Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-2xl font-bold dark:text-white text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Experience
          </motion.h2>
          <motion.a
            href="/experience"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium"
            whileHover={{ x: 5 }}
          >
            View All →
          </motion.a>
        </div>
        <ExperiencesList experiences={previewExperiences} />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-2xl font-bold dark:text-white text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Projects
          </motion.h2>
          <motion.a
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium"
            whileHover={{ x: 5 }}
          >
            View All →
          </motion.a>
        </div>
        <ProjectsList projects={previewProjects} />
      </motion.section>

      <SocialLinks />
    </>
  )
}