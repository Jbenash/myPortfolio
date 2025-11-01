import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import EmailModal from '../components/EmailModel';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const socialLinks = [
        { icon: FiGithub, href: 'https://github.com/Jbenash', label: 'GitHub', external: true },
        { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ben-asher-78a638275/', label: 'LinkedIn', external: true },
        { icon: FiMail, label: 'Email', onClick: () => setIsEmailModalOpen(true) },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t border-gray-700 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand & Tagline */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-1">
                            Ben Asher
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Full Stack Developer
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                            About
                        </Link>
                        <Link to="/projects" className="text-gray-300 hover:text-primary-400 transition-colors">
                            Projects
                        </Link>
                        <Link to="/skills" className="text-gray-300 hover:text-primary-400 transition-colors">
                            Skills
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Component = social.href ? motion.a : motion.button;
                            return (
                                <Component
                                    key={social.label}
                                    {...(social.href && { href: social.href })}
                                    {...(social.onClick && { onClick: social.onClick })}
                                    {...(social.external && {
                                        target: '_blank',
                                        rel: 'noopener noreferrer'
                                    })}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </Component>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 pt-6 border-t border-gray-700 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
                        <p className="flex items-center gap-1">
                            © {currentYear} Ben Asher. Crafted with
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-red-500"
                            >
                                <FiHeart className="inline" />
                            </motion.span>
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                Privacy
                            </a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
        </footer>
    );
};

export default Footer;
