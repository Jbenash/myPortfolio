import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                {/* 404 Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-9xl font-bold text-primary-500 mb-4"
                >
                    404
                </motion.div>

                {/* Error Message */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                >
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center justify-center space-x-2"
                    >
                        <FiHome />
                        <span>Go Home</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary inline-flex items-center justify-center space-x-2"
                    >
                        <FiArrowLeft />
                        <span>Go Back</span>
                    </button>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-9xl font-bold text-gray-200 dark:text-gray-800 select-none"
                >
                    ¯\_(ツ)_/¯
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
