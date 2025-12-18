import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skillsAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiBootstrap,
  SiTypescript,
  SiDjango,
  SiSupabase,
  SiFirebase,
  SiPostgresql,
  SiPrisma,
  SiPostman,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiJupyter,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { VscCode } from "react-icons/vsc";
import { FiCode } from "react-icons/fi";

const Skills = () => {
  const [skills, setSkills] = useState({ grouped: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("frontend");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getSkills();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkills({ grouped: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Other",
  };

  const skillIcons = {
    "React.js": { icon: SiReact, color: "#61DAFB" },
    "Next.js": { icon: SiNextdotjs, color: "#000000" },
    JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
    HTML5: { icon: SiHtml5, color: "#E34F26" },
    CSS3: { icon: SiCss3, color: "#1572B6" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
    "React Native": { icon: SiReact, color: "#61DAFB" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "Express.js": { icon: SiExpress, color: "#000000" },
    PHP: { icon: SiPhp, color: "#777BB4" },
    Python: { icon: SiPython, color: "#3776AB" },
    Java: { icon: DiJava, color: "#007396" },
    TypeScript: { icon: SiTypescript, color: "#3178C6" },
    Django: { icon: SiDjango, color: "#092E20" },
    Supabase: { icon: SiSupabase, color: "#3ECF8E" },
    Firebase: { icon: SiFirebase, color: "#FFCA28" },
    MongoDB: { icon: SiMongodb, color: "#47A248" },
    MySQL: { icon: SiMysql, color: "#4479A1" },
    PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
    Prisma: { icon: SiPrisma, color: "#2D3748" },
    Postman: { icon: SiPostman, color: "#FF6C37" },
    NumPy: { icon: SiNumpy, color: "#013243" },
    Pandas: { icon: SiPandas, color: "#150458" },
    "Scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
    Git: { icon: SiGit, color: "#F05032" },
    Jupyter: { icon: SiJupyter, color: "#F37626" },
    "VS Code": { icon: VscCode, color: "#007ACC" },
  };

  if (loading) return <LoadingSpinner />;

  const tabs = Object.keys(skills.grouped).filter((cat) =>
    ["frontend", "backend", "database", "tools"].includes(cat)
  );

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
          <p className="section-subtitle">Technologies and tools I work with</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-primary-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {categoryTitles[category]}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.grouped[activeTab]?.map((skill, index) => {
            const iconInfo = skillIcons[skill.name] || {
              icon: FiCode,
              color: "#6B7280",
            };
            const IconComponent = iconInfo.icon;

            return (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <IconComponent
                  className="w-16 h-16 mb-4"
                  style={{ color: iconInfo.color }}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
