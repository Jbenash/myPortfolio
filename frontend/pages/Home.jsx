import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import { aboutAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const navigate = useNavigate();
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await aboutAPI.getAbout();
                setAbout(response.data.data);
            } catch (error) {
                console.error('Error fetching about data:', error);


            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

                {/* Animated background shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [90, 0, 90],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary-300/20 dark:bg-primary-800/10 rounded-full blur-3xl"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="relative">
                            <img
                                src={about?.profileImage}
                                alt={about?.name}
                                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover object-top border-4 border-primary-500 dark:border-primary-600 shadow-2xl ring-4 ring-primary-100 dark:ring-primary-900/50"
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-transparent" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold font-display mb-6"
                    >
                        Hi, I'm{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                            {about?.name}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    >
                        {about?.tagline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            type="button"
                            onClick={() => navigate('/contact')}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <span>Get In Touch</span>
                        </button>
                        <a
                            href={about?.CV}
                            download
                            className="btn-secondary flex items-center space-x-2"
                        >
                            <FiDownload />
                            <span>Download Resume</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Quick Preview Section */}
            <section className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => navigate('/projects')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/projects')}
                            className="card text-center cursor-pointer"
                        >
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-2xl font-bold mb-2">Projects</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check out my latest work
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => navigate('/skills')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/skills')}
                            className="card text-center cursor-pointer"
                        >
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="text-2xl font-bold mb-2">Skills</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Explore my technical skills
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => navigate('/about')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/about')}
                            className="card text-center cursor-pointer"
                        >
                            <div className="text-4xl mb-4">👤</div>
                            <h3 className="text-2xl font-bold mb-2">About Me</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Learn more about me
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
