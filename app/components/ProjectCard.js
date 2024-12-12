'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener noreferrer')
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg flex flex-col h-full
      transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
      {project.imageUrl && (
        <div className="w-full h-48 relative overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300"
          />
        </div>
      )}
      <div className="px-4 py-5 sm:px-6 flex-grow flex flex-col">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <div className={`mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {project.description}
        </div>
        {project.description.length > 150 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm mt-2"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:p-0 mt-auto">
        <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-600">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Tech Stack
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {project.techStack.join(', ')}
            </dd>
          </div>
          {project.link && (
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Link
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <a
                  href={project.link}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}