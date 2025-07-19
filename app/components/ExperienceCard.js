"use client";

import Image from "next/image";

const formatDuration = (duration) => {
  const [start, end] = duration.split(" - ");
  const startDate = new Date(start);
  const endDate = end === "Present" ? new Date() : new Date(end);

  const totalDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 30;

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = Math.floor(totalDays % 30);

  const parts = [];
  if (years > 0) parts.push(`${years}yr`);
  if (months > 0) parts.push(`${months}mo`);
  if (days > 0) parts.push(`${days}d`);

  return parts.join(" ");
};

export default function ExperienceCard({ experience, isExpanded, onExpand }) {
  const durationText = formatDuration(experience.duration);

  return (
    <div
      className="bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg flex flex-col h-full
      transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="flex items-center px-4 py-5 sm:px-6">
        {experience.imageUrl && (
          <div className="w-12 h-12 sm:w-16 sm:h-16 relative mr-4 flex-shrink-0">
            <Image
              src={experience.imageUrl}
              alt={experience.company}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-full"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white truncate">
            {experience.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
            {experience.company === "GlitchLabs" ? (
              <span
                className="glitch-text glitch-company"
                data-text="GlitchLabs"
              >
                GlitchLabs
              </span>
            ) : (
              experience.company
            )}{" "}
            • {experience.location}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {experience.duration} • {durationText}
          </p>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6 flex-grow">
        <div
          className={`space-y-2 transition-all duration-300 ${
            isExpanded ? "max-h-[1000px]" : "max-h-[100px]"
          } overflow-hidden relative`}
        >
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-700 to-transparent" />
          )}
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-300">
            {experience.description.map((item, index) => (
              <p key={index} className="leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onExpand();
          }}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm mt-2 focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
