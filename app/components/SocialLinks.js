'use client'

import { FaWhatsapp, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'

export default function SocialLinks() {
  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/2349014839655", color: "text-green-500 hover:text-green-600" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/victorezeanyika", color: "text-blue-500 hover:text-blue-600" },
    { icon: FaGithub, href: "https://github.com/VictorEZCodes", color: "text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300" },
    { icon: FaXTwitter, href: "https://x.com/victoranyika_", color: "text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300" },
  ]

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-3 px-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div 
        className="flex gap-6 items-center justify-center"
        animate={{ x: [-20, 20, -20] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          return (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${social.color}`}
              whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 10 : -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={24} />
            </motion.a>
          )
        })}
      </motion.div>
    </motion.div>
  )
}