import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import connectDB from '../config/db.js'
import About from '../model/about.js'
import Project from '../model/Project.js'
import Skills from '../model/Skills.js'



const seedData = async () => {
    dotenv.config()

    try {
        await connectDB()
        console.log('📦 Starting database seeding...');

        //clear existing data
        await About.deleteMany({})
        await Project.deleteMany({})
        await Skills.deleteMany({})

        // Drop the problematic id index if it exists
        try {
            await Project.collection.dropIndex('id_1')
            console.log('🗑️  Dropped old id index...');
        } catch (err) {
            // Index doesn't exist, continue
        }

        console.log('🗑️  Cleared existing data...');

        //seed about information 
        await About.create(
            {
                name: 'Ben Asher',
                tagline: 'Full Stack Developer | Backend Enthusiast',
                bio: 'I am a passionate developer with expertise in building dynamic web applications using React and Node.js. My journey in tech started with a curiosity for how things work, and it has evolved into a deep love for creating seamless user experiences.',
                profileImage: 'https://myportfolio-1-5p8z.onrender.com/uploads/images/profile.jpg',
                education: [
                    {
                        degree: 'Computer Science and Technology B.Sc.',
                        institution: 'Uva Wellassa University',
                        year: '2023 - 2027',
                        description: 'Focused on core areas such as programming, database systems, and web development. Throughout the course, I worked on several academic and personal projects that strengthened my practical knowledge of full-stack development. Gained hands-on experience in developing web applications using React.js, Next.js for the frontend and Python, PHP, Node.js using the frameworks Django, Express JS with MySQL, MongoDB for the backend. These projects helped me understand the complete development cycle, from database design to dynamic user interfaces and server-side logic. My studies and project work also deepened my interest in backend development, DevOps, and cybersecurity, motivating me to continue exploring modern technologies.'
                    }
                ],
                courses: [{
                    name: "Python for Beginners",
                    provider: "University of Morattuwa",
                    year: "2025",
                    image: "https://myportfolio-1-5p8z.onrender.com/uploads/images/python-certificate.png",
                    certificateUrl: "https://myportfolio-1-5p8z.onrender.com/uploads/files/Python_for_Beginners_E-Certificate.pdf"

                }],
                interests: ['Artificial Intelligence', 'Cybersecurity', 'Machine Learning', 'Deep Learning', 'Backend Development', 'Network Security', 'Automation Tools'],

                CV: 'https://myportfolio-1-5p8z.onrender.com/api/download/resume'

            }
        )

        await Project.create(
            [
                {
                    title: 'LiveOn-Blood Donation Platform',
                    description: 'A platform connecting blood donors with those in need. Features include user registration, blood donation requests, and a real-time blood bank system.',
                    technologies: ['React', 'PHP', 'MySQL'],
                    githubLink: 'https://github.com/Jbenash/LiveOn-BloodDonationSystem.git',
                    screenshot: 'https://myportfolio-1-5p8z.onrender.com/uploads/images/Project1.png',
                    featured: true,
                    order: 1
                }, {
                    title: "Shopify E-Commerce Shopping Platform",
                    description: "An e-commerce website built as a practice project, featuring product listings, secure user authentication, image management with Cloudinary, and a complete shopping cart ",
                    technologies: ['React', 'NodeJS', 'MongoDB', 'ExpressJS', 'JWT', 'Cloudinary'],
                    githubLink: 'https://github.com/Jbenash/E-Commerce-App',
                    screenshot: 'https://myportfolio-1-5p8z.onrender.com/uploads/images/E-Commerce.png',
                    featured: true,
                    order: 2
                }
            ]


        )
        await Skills.create(
            [
                { name: 'React.js', category: 'frontend', level: 85, icon: 'react', order: 1 },
                { name: 'Next.js', category: 'frontend', level: 80, icon: 'nextjs', order: 2 },
                { name: 'JavaScript', category: 'frontend', level: 80, icon: 'javascript', order: 3 },
                { name: 'HTML5', category: 'frontend', level: 90, icon: 'html5', order: 4 },
                { name: 'CSS3', category: 'frontend', level: 85, icon: 'css3', order: 5 },
                { name: 'Tailwind CSS', category: 'frontend', level: 75, icon: 'tailwind', order: 6 },

                // Backend
                { name: 'Node.js', category: 'backend', level: 80, icon: 'nodejs', order: 1 },
                { name: 'Express.js', category: 'backend', level: 75, icon: 'express', order: 2 },
                { name: 'PHP', category: 'backend', level: 50, icon: 'php', order: 3 },
                { name: 'Python', category: 'backend', level: 60, icon: 'python', order: 4 },
                { name: 'Java', category: 'backend', level: 60, icon: 'java', order: 5 },


                // Database
                { name: 'MongoDB', category: 'database', level: 75, icon: 'mongodb', order: 1 },
                { name: 'MySQL', category: 'database', level: 70, icon: 'mysql', order: 2 },

                // Tools
                { name: 'Git', category: 'tools', level: 80, icon: 'git', order: 1 },
                { name: 'VS Code', category: 'tools', level: 85, icon: 'vscode', order: 2 },

                // Soft Skills
                { name: 'Problem Solving', category: 'soft-skills', level: 85, icon: 'puzzle', order: 1 },
                { name: 'Communication', category: 'soft-skills', level: 80, icon: 'communication', order: 2 },
                { name: 'Teamwork', category: 'soft-skills', level: 90, icon: 'teamwork', order: 3 },
                { name: 'Adaptability', category: 'soft-skills', level: 75, icon: 'adaptability', order: 4 }
            ]
        )


        console.log('✅ Database seeded successfully!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }

}

seedData();
