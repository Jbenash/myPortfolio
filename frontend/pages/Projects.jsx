import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectsAPI.getProjects();
                setProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.featured);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="section-title">My Projects</h1>
                    <p className="section-subtitle">
                        A collection of projects I've worked on
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => setFilter('featured')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'featured'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        Featured
                    </button>
                </motion.div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project._id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No projects found. Check back later!
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Projects;
