import ProjectsList from './components/ProjectsList'
import projects from '../data/projects.json'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Victor</h1>
      <p className="mb-6 text-gray-600">FullStack Developer</p>
      <ProjectsList projects={projects} />
    </>
  )
}