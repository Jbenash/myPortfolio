import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiHeart, FiEye, FiDownload } from 'react-icons/fi';
import { aboutAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CertificateModal from '../components/CertificateModal';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            Get to know more about my background and journey
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-12"
        >
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {about?.bio}
            </p>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FiBook className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Education</h2>
          </div>

          <div className="space-y-6">
            {about?.education && about.education.length > 0 ? (
              about.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No education information available.</p>
            )}
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FiAward className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Courses & Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about?.courses && about.courses.length > 0 ? (
              about.courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="card group overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Certificate Image */}
                  {course.image && (
                    <div className="relative h-48 mb-4 -mt-6 -mx-6 overflow-hidden cursor-pointer">
                      <img
                        src={course.image}
                        alt={`${course.name} Certificate`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onClick={() => setSelectedCertificate(course)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Action Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setSelectedCertificate(course)}
                          className="flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-gray-900/95 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-semibold hover:bg-white dark:hover:bg-gray-900 shadow-lg transform hover:scale-105 transition-all"
                        >
                          <FiEye className="text-lg" />
                          View
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Certificate Info */}
                  <div className={course.image ? '' : 'pt-0'}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {course.provider}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                      {course.year}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No courses information available.</p>
            )}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <FiHeart className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Interests</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {about?.interests && about.interests.length > 0 ? (
              about.interests.map((interest, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {interest}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No interests information available.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

export default About;
