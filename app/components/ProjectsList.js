"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useState } from "react";

export default function ProjectsList({ projects }) {
  const scrollDirection = useScrollDirection();
  const [expandedStates, setExpandedStates] = useState({});

  // Filter out hidden projects
  const visibleProjects = projects.filter((project) => !project.hidden);

  const getAnimationVariants = (index) => ({
    initial: {
      opacity: 0,
      y: scrollDirection === "down" ? 20 : -20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  });

  const handleExpand = (id) => {
    setExpandedStates((prev) => {
      if (prev[id]) {
        const newStates = { ...prev };
        delete newStates[id];
        return newStates;
      }

      return { [id]: true };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visibleProjects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={getAnimationVariants(index)}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
            margin: "0px",
            amount: 0.3,
          }}
          transition={{
            duration: 0.4,
            delay: Math.min(index * 0.05, 0.3),
            ease: "easeOut",
          }}
        >
          <div className="h-full">
            <ProjectCard
              project={project}
              isExpanded={!!expandedStates[project.id]}
              onExpand={() => handleExpand(project.id)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
