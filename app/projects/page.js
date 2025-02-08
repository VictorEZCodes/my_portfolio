'use client'

import ProjectsList from '../components/ProjectsList'
import projects from '../../data/projects.json'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import SocialLinks from '../components/SocialLinks'
import ScrollArrow from '../components/ScrollArrow'
import { useState, useEffect } from 'react'

export default function ProjectsPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalProjects = projects.length
  const techStacks = [...new Set(projects.flatMap(project => project.techStack))]
  const mostUsedTech = Object.entries(
    projects.flatMap(project => project.techStack)
      .reduce((acc, tech) => ({ ...acc, [tech]: (acc[tech] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 3)

  const techCategories = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Railway', 'Supabase', 'Prisma'],
    blockchain: ['Solidity', 'Web3.js', 'Ethers.js', 'Hardhat', 'OpenZeppelin'],
    ai: ['OpenAI API', 'HuggingFace', 'GPT-4', 'RapidAPI'],
    tools: ['Chart.js', 'Discord.js', 'Whatsapp-web.js', 'Telegraf', 'LocalStorage', 'GitHub API']
  }
  
  const introSlides = [
    {
      title: "Welcome to My Project Gallery",
      content: `✨ Hello, fellow developers! ✨\n\n` +
        `🚀 Ready to explore my coding adventures?\n` +
        `💻 From simple scripts to full-stack applications\n` +
        `🌟 Each project tells a unique story\n\n` +
        `Let's dive in...`
    },
    {
      title: `${totalProjects} Projects Created`,
      content: (() => {
        const projectsPerLine = '🔹'.repeat(Math.min(totalProjects, 10))
        const projectTypes = [...new Set(projects.map(p => p.techStack[0]))].length
        
        return `${projectsPerLine}\n\n` +
          `📊 Portfolio Highlights:\n` +
          `🎯 ${totalProjects} unique projects\n` +
          `🔧 ${projectTypes} different primary technologies\n` +
          `💪 ${techStacks.length} total technologies mastered\n\n` +
          `Each project represents a milestone in my development journey`
      })()
    },
    {
      title: "Tech Stack Evolution",
      content: `My Journey Through Different Technologies\n\n` +
        `🎨 Frontend Development\n` +
        `${techStacks.filter(tech => techCategories.frontend.includes(tech)).join(' • ')}\n\n` +
        `⚙️ Backend & Databases\n` +
        `${techStacks.filter(tech => techCategories.backend.includes(tech)).join(' • ')}\n\n` +
        `⛓️ Blockchain Development\n` +
        `${techStacks.filter(tech => techCategories.blockchain.includes(tech)).join(' • ')}\n\n` +
        `🤖 AI & Machine Learning\n` +
        `${techStacks.filter(tech => techCategories.ai.includes(tech)).join(' • ')}\n\n` +
        `🛠️ Development Tools\n` +
        `${techStacks.filter(tech => techCategories.tools.includes(tech)).join(' • ')}`
    },
    {
      title: "Most Used Technologies",
      content: mostUsedTech.map(([tech, count], index) => {
        const percentage = Math.round((count / totalProjects) * 100)
        const category = Object.entries(techCategories)
          .find(([_, techs]) => techs.includes(tech))?.[0] || 'other'
        
        const categoryEmojis = {
          frontend: '🎨',
          backend: '⚙️',
          blockchain: '⛓️',
          ai: '🤖',
          tools: '🛠️',
          other: '📦'
        }

        const medals = ['🥇', '🥈', '🥉']
        const progressBar = '▓'.repeat(Math.floor(percentage/10)) + '░'.repeat(10 - Math.floor(percentage/10))

        return `${medals[index]} ${categoryEmojis[category]} ${tech}\n${progressBar} ${count} projects (${percentage}%)`
      }).join('\n\n')
    },
    {
      title: "Personal Favorite Project",
      content: (() => {
        const favoriteProject = projects.find(project => project.favorite)
        if (!favoriteProject) return "Coming soon..."
        
        return `✨ ${favoriteProject.title} ✨\n\n` +
          `${favoriteProject.description}\n\n` +
          `🛠️ Built with: ${favoriteProject.techStack.join(', ')}\n` +
          `🔗 ${favoriteProject.link}`
      })()
    },
    {
      title: "Development Timeline",
      content: (() => {
        const firstProject = projects[0]
        const latestProject = projects[projects.length - 1]
        const totalTechs = [...new Set(projects.flatMap(p => p.techStack))].length

        return `📈 Journey Progress\n\n` +
          `🌱 Started with: "${firstProject.title}"\n` +
          `Built using: ${firstProject.techStack.join(', ')}\n\n` +
          `🚀 Latest: "${latestProject.title}"\n` +
          `Using: ${latestProject.techStack.join(', ')}\n\n` +
          `💡 Growth: From ${firstProject.techStack.length} to ${latestProject.techStack.length} technologies per project\n` +
          `🎯 Total unique technologies mastered: ${totalTechs}`
      })()
    },
    {
      title: "🎉 Your adventure through my portfolio awaits!",
      content: "✨ Scroll through to see all projects in detail"
    }
  ]

  useEffect(() => {
    if (!isPaused && introStep < introSlides.length) {
      const timer = setTimeout(() => {
        setIntroStep(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (introStep >= introSlides.length) {
      const timer = setTimeout(() => {
        setShowIntro(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [introStep, isPaused])

  return (
    <>
      <AnimatePresence>
      {showIntro ? (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-[#121212] flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
        >
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isPaused ? 
              <span className="text-2xl">▶️</span> : 
              <span className="text-2xl">⏸️</span>
            }
          </button>
          <AnimatePresence mode='wait'>
            {introStep < introSlides.length && (
              <motion.div
                key={introStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center p-8 max-w-2xl"
              >
                <motion.h2 
                  className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  {introSlides[introStep].title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 whitespace-pre-line"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  {introSlides[introStep].content}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        ) : (
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                All Projects
              </h1>
            </motion.div>
            <ProjectsList projects={projects} />
          </div>
        )}
      </AnimatePresence>

      <SocialLinks />
      <ScrollArrow />
    </>
  )
}