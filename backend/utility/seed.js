import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "../config/db.js";
import About from "../model/about.js";
import Project from "../model/Project.js";
import Skills from "../model/Skills.js";

const seedData = async () => {
  dotenv.config();

  try {
    await connectDB();
    console.log("📦 Starting database seeding...");

    //clear existing data
    await About.deleteMany({});
    await Project.deleteMany({});
    await Skills.deleteMany({});

    // Drop the problematic id index if it exists
    try {
      await Project.collection.dropIndex("id_1");
      console.log("🗑️  Dropped old id index...");
    } catch (err) {
      // Index doesn't exist, continue
    }

    console.log("🗑️  Cleared existing data...");

    //seed about information
    await About.create({
      name: "Ben Asher",
      tagline: "Full Stack Developer | Backend Enthusiast",
      bio: "Enthusiastic Computer Science undergraduate seeking a Backend Developer or Full Stack Developer role to apply strong problem-solving and system-level skills. Passionate about building scalable APIs and secure backend systems using Node.js, Express, and MongoDB. Experienced in leading and contributing to full-stack projects following MVC architecture and modern software development practices. Continuous learner exploring emerging domains such as Artificial Intelligence and Cybersecurity, constantly enhancing technical knowledge to stay aligned with evolving industry trends.",
      profileImage:
        "https://myportfolio-1-5p8z.onrender.com/uploads/images/profile.jpeg",
      education: [
        {
          degree: "Bsc(Hons) in Computer Science and Technology",
          institution: "Uva Wellassa University",
          year: "September 2023 - September 2027",
          logo: "https://myportfolio-1-5p8z.onrender.com/uploads/images/UWU_Logo.jpg",
          description:
            "Pursuing a comprehensive Computer Science degree with a focus on software engineering, web development, and emerging technologies. Actively engaged in projects involving full-stack development, RESTful API design, and database management. Gained hands-on experience in building scalable applications using MERN stack, implementing secure authentication systems, and following industry-standard software development practices including version control, agile methodologies, and MVC architecture.",
        },
      ],
      technicalSkills: [
        { name: "React.js", icon: "SiReact", category: "Frontend" },
        { name: "Node.js", icon: "SiNodedotjs", category: "Backend" },
        { name: "Express.js", icon: "SiExpress", category: "Backend" },
        { name: "MongoDB", icon: "SiMongodb", category: "Database" },
        { name: "JavaScript", icon: "SiJavascript", category: "Language" },
        { name: "TypeScript", icon: "SiTypescript", category: "Language" },
        { name: "Python", icon: "SiPython", category: "Language" },
        { name: "MySQL", icon: "SiMysql", category: "Database" },
        { name: "Git", icon: "SiGit", category: "Tools" },
        { name: "REST APIs", icon: "FiServer", category: "Backend" },
        {
          name: "JWT Authentication",
          icon: "SiJsonwebtokens",
          category: "Security",
        },
        { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Frontend" },
      ],
      softSkills: [
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Time Management",
        "Adaptability",
        "Critical Thinking",
        "Leadership",
        "Coordination",
      ],
      courses: [
        {
          name: "Python for Beginners",
          provider: "University of Morattuwa",
          year: "2025",
          image:
            "https://myportfolio-1-5p8z.onrender.com/uploads/images/python-certificate.png",
          certificateUrl:
            "https://myportfolio-1-5p8z.onrender.com/uploads/files/Python_for_Beginners_E-Certificate.pdf",
        },
      ],
      interests: [
        "Artificial Intelligence",
        "Cybersecurity",
        "Machine Learning",
        "Deep Learning",
        "Backend Development",
        "Network Security",
        "Automation Tools",
      ],

      CV: "https://myportfolio-1-5p8z.onrender.com/api/download/resume",
    });

    await Project.create([
      {
        title: "LiveOn-Blood Donation Platform",
        description:
          "A platform connecting blood donors with those in need. Features include user registration, blood donation requests, and a real-time blood bank system.",
        technologies: ["React", "PHP", "MySQL", "Composer"],
        githubLink: "https://github.com/Jbenash/LiveOn-BloodDonationSystem.git",
        screenshot:
          "https://myportfolio-1-5p8z.onrender.com/uploads/images/Project1.png",
        featured: true,
        order: 1,
      },
      {
        title: "Shopify E-Commerce Shopping Platform",
        description:
          "An e-commerce website built as a practice project, featuring product listings, secure user authentication, image management with Cloudinary, and a complete shopping cart ",
        technologies: [
          "React",
          "NodeJS",
          "MongoDB",
          "ExpressJS",
          "JWT",
          "Cloudinary",
        ],
        githubLink: "https://github.com/Jbenash/E-Commerce-App",
        screenshot:
          "https://myportfolio-1-5p8z.onrender.com/uploads/images/E-Commerce.png",
        featured: true,
        order: 2,
      },
    ]);
    await Skills.create([
      {
        name: "React.js",
        category: "frontend",
        level: 85,
        icon: "react",
        order: 1,
      },
      {
        name: "Next.js",
        category: "frontend",
        level: 80,
        icon: "nextjs",
        order: 2,
      },
      {
        name: "JavaScript",
        category: "frontend",
        level: 80,
        icon: "javascript",
        order: 3,
      },
      {
        name: "HTML5",
        category: "frontend",
        level: 90,
        icon: "html5",
        order: 4,
      },
      { name: "CSS3", category: "frontend", level: 85, icon: "css3", order: 5 },
      {
        name: "Tailwind CSS",
        category: "frontend",
        level: 75,
        icon: "tailwind",
        order: 6,
      },
      {
        name: "React Native",
        category: "frontend",
        level: 70,
        icon: "react",
        order: 7,
      },

      // Backend
      {
        name: "Node.js",
        category: "backend",
        level: 80,
        icon: "nodejs",
        order: 1,
      },
      {
        name: "Express.js",
        category: "backend",
        level: 75,
        icon: "express",
        order: 2,
      },
      { name: "PHP", category: "backend", level: 50, icon: "php", order: 3 },
      {
        name: "Python",
        category: "backend",
        level: 60,
        icon: "python",
        order: 4,
      },
      { name: "Java", category: "backend", level: 60, icon: "java", order: 5 },
      {
        name: "TypeScript",
        category: "backend",
        level: 75,
        icon: "typescript",
        order: 6,
      },
      {
        name: "Django",
        category: "backend",
        level: 65,
        icon: "django",
        order: 7,
      },
      {
        name: "Supabase",
        category: "backend",
        level: 60,
        icon: "supabase",
        order: 8,
      },
      {
        name: "Firebase",
        category: "backend",
        level: 65,
        icon: "firebase",
        order: 9,
      },

      // Database
      {
        name: "MongoDB",
        category: "database",
        level: 75,
        icon: "mongodb",
        order: 1,
      },
      {
        name: "MySQL",
        category: "database",
        level: 70,
        icon: "mysql",
        order: 2,
      },
      {
        name: "PostgreSQL",
        category: "database",
        level: 65,
        icon: "postgresql",
        order: 3,
      },
      {
        name: "Prisma",
        category: "database",
        level: 60,
        icon: "prisma",
        order: 4,
      },

      // Tools
      {
        name: "Postman",
        category: "tools",
        level: 75,
        icon: "postman",
        order: 1,
      },
      {
        name: "NumPy",
        category: "tools",
        level: 70,
        icon: "numpy",
        order: 2,
      },
      {
        name: "Pandas",
        category: "tools",
        level: 70,
        icon: "pandas",
        order: 3,
      },
      {
        name: "Scikit-learn",
        category: "tools",
        level: 65,
        icon: "scikitlearn",
        order: 4,
      },
      { name: "Git", category: "tools", level: 80, icon: "git", order: 5 },
      {
        name: "Jupyter",
        category: "tools",
        level: 70,
        icon: "jupyter",
        order: 6,
      },
      {
        name: "VS Code",
        category: "tools",
        level: 85,
        icon: "vscode",
        order: 7,
      },

      // Soft Skills
      {
        name: "Problem Solving",
        category: "soft-skills",
        level: 85,
        icon: "puzzle",
        order: 1,
      },
      {
        name: "Communication",
        category: "soft-skills",
        level: 80,
        icon: "communication",
        order: 2,
      },
      {
        name: "Teamwork",
        category: "soft-skills",
        level: 90,
        icon: "teamwork",
        order: 3,
      },
      {
        name: "Adaptability",
        category: "soft-skills",
        level: 75,
        icon: "adaptability",
        order: 4,
      },
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();
