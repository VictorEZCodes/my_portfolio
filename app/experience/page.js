'use client'

import ExperiencesList from '../components/ExperienceList'
import experiences from '../../data/experiences.json'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SocialLinks from '../components/SocialLinks'

export default function ExperiencePage() {
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link 
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 inline-block mb-4"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold dark:text-white">
          All Career History
        </h1>
      </motion.div>
      <ExperiencesList experiences={experiences} />
    </div>

    <SocialLinks />
    </>
  )
}