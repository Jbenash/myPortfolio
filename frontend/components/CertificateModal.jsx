import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';

const CertificateModal = ({ certificate, onClose }) => {
    // Close modal on ESC key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleDownload = async () => {
        if (!certificate.certificateUrl) return;

        // Open PDF in new tab for download
        window.open(certificate.certificateUrl, '_blank');
    };

    if (!certificate) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {certificate.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {certificate.provider} • {certificate.year}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Close modal"
                        >
                            <FiX className="text-2xl text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Certificate Image Preview */}
                    <div className="relative bg-gray-100 dark:bg-gray-950 p-4 max-h-[70vh] overflow-auto">
                        <img
                            src={certificate.image}
                            alt={`${certificate.name} Certificate Preview`}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Footer with Actions */}
                    <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Screenshot preview • Press ESC to close
                        </div>
                        <div className="flex gap-3">
                            {/* View PDF Button */}
                            {certificate.certificateUrl && (
                                <a
                                    href={certificate.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                                >
                                    <FiExternalLink className="text-lg" />
                                    View PDF Certificate
                                </a>
                            )}

                            {/* Download PDF Button */}
                            {certificate.certificateUrl && (
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                                >
                                    <FiDownload className="text-lg" />
                                    Download PDF
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificateModal;
