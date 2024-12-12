'use client'

import ProjectsList from './components/ProjectsList'
import projects from '../data/projects.json'
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 dark:text-white text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Victor Ezeanyika
        </motion.h1>
        <motion.p
          className="mb-6 dark:text-gray-300 text-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          FullStack Developer
        </motion.p>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Resume Button */}
          <motion.a
            href="/VICTOR_EZEANYIKA_Resume.pdf"
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
            href="https://www.linkedin.com/in/ifunanyaezeanyika"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
        </motion.div>
      </motion.div>

      <ProjectsList projects={projects} />
    </>
  )
}