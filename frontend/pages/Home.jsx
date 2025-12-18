import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload, FiArrowDown } from "react-icons/fi";
import { aboutAPI, projectsAPI, skillsAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ProjectCard from "../components/ProjectCard";
import About from "./About";
import Skills from "./Skills";
import Contact from "./contact";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, projectsRes] = await Promise.all([
          aboutAPI.getAbout(),
          projectsAPI.getProjects(),
        ]);
        setAbout(aboutRes.data.data);
        setProjects(projectsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    // Use direct link approach for maximum compatibility
    // This bypasses blob/fetch issues that can cause corruption
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
      "http://localhost:5000";
    const downloadUrl = `${baseUrl}/api/download/resume`;

    // Create a hidden anchor element
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Ben_Asher_Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();

    // Clean up immediately
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden snap-start snap-always">
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
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 0.8,
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            className="mb-8 flex justify-center"
          >
            <motion.div 
              className="relative"
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={about?.profileImage}
                alt={about?.name}
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover object-top border-4 border-primary-500 dark:border-primary-600 shadow-2xl ring-4 ring-primary-100 dark:ring-primary-900/50"
                style={{ objectPosition: "center 20%" }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold font-display mb-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Hi, I'm{" "}
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
              {about?.name}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              {about?.tagline}
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.6 }}
              whileHover={{ scale: 1.1, rotate: 3 }} 
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="/contact"
                className="btn-primary flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              >
                <span>Get In Touch</span>
              </Link>
            </motion.div>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.8 }}
              onClick={handleDownload}
              className="btn-secondary flex items-center space-x-2 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
              style={{ cursor: "pointer" }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiDownload />
              </motion.div>
              <span>Download Resume</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.3, once: false }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
        className="min-h-screen flex items-center py-20 px-4 bg-white dark:bg-gray-900 snap-start snap-always"
      >
        <motion.div 
          className="w-full"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <About />
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, rotateX: 90, scale: 0.5 }}
        whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
        viewport={{ amount: 0.3, once: false }}
        transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
        style={{ perspective: 1000 }}
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50 dark:bg-gray-800 snap-start snap-always"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">
              A collection of projects I've worked on
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, x: 200, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ amount: 0.3, once: false }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
        className="min-h-screen flex items-center py-20 px-4 bg-white dark:bg-gray-900 snap-start snap-always"
      >
        <motion.div 
          className="w-full"
          initial={{ rotate: -10, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Skills />
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, scale: 0.3, y: 200 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.3, once: false }}
        transition={{ 
          duration: 1.2, 
          type: "spring", 
          stiffness: 100,
          bounce: 0.4
        }}
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50 dark:bg-gray-800 snap-start snap-always"
      >
        <motion.div 
          className="w-full"
          initial={{ rotateY: 90 }}
          whileInView={{ rotateY: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ perspective: 1000 }}
        >
          <Contact />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
