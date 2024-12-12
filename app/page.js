import ProjectsList from './components/ProjectsList'
import projects from '../data/projects.json'
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white text-gray-900">Victor Ezeanyika</h1>
        <p className="mb-6 dark:text-gray-300 text-gray-700">FullStack Developer</p>

        {/* Social Links and Resume Button */}
        <div className="flex items-center gap-4">
          <a
            href="/VICTOR_EZEANYIKA_Resume.pdf"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Resume
          </a>

          {/* WhatsApp Link */}
          <a
            href="https://wa.me/2349014839655"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 transition-colors"
          >
            <FaWhatsapp size={24} />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/ifunanyaezeanyika"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      <ProjectsList projects={projects} />
    </>
  )
}