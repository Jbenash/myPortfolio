import { motion } from 'framer-motion';

const SkillTag = ({ skill, index }) => {
    const getCategoryColor = (category) => {
        const colors = {
            frontend: 'from-blue-500 to-cyan-500',
            backend: 'from-green-500 to-emerald-500',
            database: 'from-purple-500 to-pink-500',
            tools: 'from-orange-500 to-red-500',
            'soft-skills': 'from-indigo-500 to-purple-500',
        };
        return colors[category] || 'from-gray-500 to-gray-600';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="space-y-2"
        >
            {/* Skill Name */}
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                </span>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {skill.level}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full`}
                />
            </div>
        </motion.div>
    );
};

export default SkillTag;
