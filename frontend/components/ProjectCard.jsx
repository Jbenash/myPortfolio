import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import {
  SiReact,
  SiPhp,
  SiMysql,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiPython,
  SiDjango,
  SiNextdotjs,
  SiTailwindcss,
  SiCloudinary,
  SiTypescript,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { RiKey2Fill } from "react-icons/ri";
import MailIcon from "./MailIcon";

// Technology icon mapping
const techIcons = {
  React: { icon: SiReact, color: "#61DAFB" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  NodeJS: { icon: SiNodedotjs, color: "#339933" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  ExpressJS: { icon: SiExpress, color: "#000000" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  Express: { icon: SiExpress, color: "#000000" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Python: { icon: SiPython, color: "#3776AB" },
  Django: { icon: SiDjango, color: "#092E20" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  TailwindCSS: { icon: SiTailwindcss, color: "#06B6D4" },
  Cloudinary: { icon: SiCloudinary, color: "#3448C5" },
  JWT: { icon: RiKey2Fill, color: "#000000" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Java: { icon: DiJava, color: "#007396" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  Composer: { icon: MailIcon, color: "#885630" },
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-64 bg-gray-800">
        <img
          src={project.screenshot}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-3">
          {project.title}
        </h2>

        <p className="text-gray-400 text-sm mb-6 flex-grow">
          {project.description}
        </p>

        {/* Technologies Used Label */}
        <div className="mb-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-3">
            Technologies Used
          </p>
          
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => {
              const normalizedTech = tech.trim();
              const techInfo = techIcons[normalizedTech];

              if (techInfo) {
                const IconComponent = techInfo.icon;
                return (
                  <div
                    key={i}
                    className="bg-gray-800 dark:bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: techInfo.color }}
                    />
                    <span className="text-gray-300 text-xs font-medium">
                      {tech}
                    </span>
                  </div>
                );
              }
              return (
                <span
                  key={i}
                  className="bg-gray-800 dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-300 text-xs font-medium"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-800">
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <FiGithub className="w-5 h-5" />
              <span>View on GitHub</span>
            </motion.a>
          )}
          {project.demoLink && (
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-medium transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              <span>View Project</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
