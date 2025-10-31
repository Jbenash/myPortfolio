import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../services/api';
import SkillTag from '../components/SkillTag';
import LoadingSpinner from '../components/LoadingSpinner';

const Skills = () => {
  const [skills, setSkills] = useState({ grouped: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getSkills();
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkills({ grouped: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categoryTitles = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Databases',
    tools: 'Tools & Technologies',
    'soft-skills': 'Soft Skills',
  };

  const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🛠️',
    'soft-skills': '💡',
  };

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
          <h1 className="section-title">My Skills</h1>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {Object.entries(skills.grouped).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-3">{categoryIcons[category]}</span>
                <h2 className="text-3xl font-bold font-display">
                  {categoryTitles[category]}
                </h2>
              </div>

              <div className="card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, index) => (
                    <SkillTag key={skill._id} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="card bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
            <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I believe in continuous learning and staying updated with the latest technologies. 
              These skills represent my current expertise, but I'm always eager to learn more!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
