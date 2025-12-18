import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiHeart, FiEye, FiDownload, FiServer, FiUsers, FiTool } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiTypescript, SiPython, SiMysql, SiGit, SiJsonwebtokens, SiTailwindcss } from 'react-icons/si';
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
          <div className="flex items-center mb-8">
            <FiBook className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Education</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-300 dark:from-primary-400 dark:to-primary-600"></div>

            <div className="space-y-8">
              {about?.education && about.education.length > 0 ? (
                about.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Icon with Logo */}
                    <div className="absolute left-0 w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-lg border-4 border-primary-500 dark:border-primary-400 flex items-center justify-center overflow-hidden">
                      {edu.logo ? (
                        <img 
                          src={edu.logo} 
                          alt={edu.institution}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <FiBook className="text-2xl text-primary-600 dark:text-primary-400" />
                      )}
                    </div>

                    {/* Education Card */}
                    <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-l-4 border-primary-500 dark:border-primary-400">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {edu.year}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 pl-20">No education information available.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center mb-8">
            <FiTool className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {about?.technicalSkills && about.technicalSkills.length > 0 ? (
              about.technicalSkills.map((skill, index) => {
                const iconMap = {
                  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript,
                  SiTypescript, SiPython, SiMysql, SiGit, SiJsonwebtokens,
                  SiTailwindcss, FiServer
                };
                const IconComponent = iconMap[skill.icon] || FiTool;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.03 }}
                    className="card flex flex-col items-center justify-center p-4 hover:shadow-lg hover:scale-105 transition-all group"
                  >
                    <IconComponent className="text-4xl text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">
                      {skill.name}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {skill.category}
                    </span>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-gray-600 dark:text-gray-400 col-span-full">No technical skills information available.</p>
            )}
          </div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center mb-8">
            <FiUsers className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Soft Skills</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {about?.softSkills && about.softSkills.length > 0 ? (
              about.softSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-primary-500 dark:border-primary-400 text-gray-900 dark:text-white rounded-lg font-medium shadow hover:shadow-lg hover:scale-105 transition-all"
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No soft skills information available.</p>
            )}
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
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
          transition={{ delay: 1.0 }}
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
                  transition={{ delay: 1.1 + index * 0.05 }}
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
