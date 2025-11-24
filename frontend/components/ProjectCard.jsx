import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
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
    SiRedis
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { RiKey2Fill } from 'react-icons/ri';
import MailIcon from './MailIcon';
import { DiJava } from 'react-icons/di';
import { RiKey2Fill } from 'react-icons/ri';

// Technology icon mapping
const techIcons = {
    'React': { icon: SiReact, color: '#61DAFB' },
    'React.js': { icon: SiReact, color: '#61DAFB' },
    'PHP': { icon: SiPhp, color: '#777BB4' },
    'MySQL': { icon: SiMysql, color: '#4479A1' },
    'NodeJS': { icon: SiNodedotjs, color: '#339933' },
    'Node.js': { icon: SiNodedotjs, color: '#339933' },
    'MongoDB': { icon: SiMongodb, color: '#47A248' },
    'ExpressJS': { icon: SiExpress, color: '#000000' },
    'Express.js': { icon: SiExpress, color: '#000000' },
    'Express': { icon: SiExpress, color: '#000000' },
    'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
    'Python': { icon: SiPython, color: '#3776AB' },
    'Django': { icon: SiDjango, color: '#092E20' },
    'Next.js': { icon: SiNextdotjs, color: '#000000' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'TailwindCSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'Cloudinary': { icon: SiCloudinary, color: '#3448C5' },
    'JWT': { icon: RiKey2Fill, color: '#000000' },
    'TypeScript': { icon: SiTypescript, color: '#3178C6' },
    'Java': { icon: DiJava, color: '#007396' },
    'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
    'Redis': { icon: SiRedis, color: '#DC382D' },
    'Composer': { icon: MailIcon, color: '#885630' }
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group"
        >
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gray-200 dark:bg-gray-700">
                <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Project Info */}
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3 items-center">
                    {project.technologies.map((tech, i) => {
                        // Normalize the tech name for lookup
                        const normalizedTech = tech.trim();
                        const techInfo = techIcons[normalizedTech];
                        
                        if (techInfo) {
                            const IconComponent = techInfo.icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    className="relative group/tech"
                                    title={tech}
                                >
                                    <IconComponent 
                                        className="w-7 h-7 transition-all"
                                        style={{ color: techInfo.color }}
                                    />
                                    {/* Tooltip */}
                                    <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded shadow-lg opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        {tech}
                                    </span>
                                </motion.div>
                            );
                        }
                        // Fallback to text badge if icon not found
                        return (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full"
                            >
                                {tech}
                            </span>
                        );
                    })}
                </div>

                {/* Links */}
                <div className="flex space-x-4 pt-4">
                    {project.githubLink && (
                        <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            <FiGithub />
                            <span>Code</span>
                        </motion.a>
                    )}
                    {project.demoLink && (
                        <motion.a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            <FiExternalLink />
                            <span>Demo</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
