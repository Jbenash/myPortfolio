import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiHeart, FiEye, FiDownload, FiCode, FiUsers, FiCalendar } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiPython, SiMysql, SiGit, SiTailwindcss } from 'react-icons/si';
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

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FiCode className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Technical Skills</h2>
          </div>

          <div className="card">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6">
              {[
                { icon: SiReact, name: 'React', color: 'text-blue-400' },
                { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500' },
                { icon: SiExpress, name: 'Express', color: 'text-gray-600 dark:text-gray-300' },
                { icon: SiMongodb, name: 'MongoDB', color: 'text-green-600' },
                { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
                { icon: SiPython, name: 'Python', color: 'text-blue-500' },
                { icon: SiMysql, name: 'MySQL', color: 'text-blue-600' },
                { icon: SiGit, name: 'Git', color: 'text-orange-500' },
                { icon: SiTailwindcss, name: 'Tailwind', color: 'text-cyan-400' },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <tech.icon className={`text-5xl ${tech.color} transition-transform group-hover:scale-110`} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FiUsers className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Soft Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Communication',
              'Team Collaboration',
              'Problem Solving',
              'Time Management',
              'Leadership',
              'Adaptability',
              'Critical Thinking',
              'Project Coordination'
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="card text-center py-4 hover:shadow-lg transition-shadow"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <FiBook className="text-3xl text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold font-display">Education</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300"></div>

            <div className="space-y-8">
              {about?.education && about.education.length > 0 ? (
                about.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Timeline icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-0.5 shadow-lg">
                        <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">
                          <FiBook className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                    </div>

                    {/* Education card */}
                    <div className="flex-1 card bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-primary-500">
                      <div className="flex items-start gap-4">
                        {/* University logo */}
                        {edu.logo && (
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white dark:bg-gray-700 p-2 shadow-md">
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        {/* Education details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
                            <FiBook className="text-lg" />
                            <p className="font-medium">{edu.institution}</p>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                            <FiCalendar className="text-lg" />
                            <p className="font-medium">{edu.year}</p>
                          </div>
                          {edu.description && (
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No education information available.</p>
              )}
            </div>
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
