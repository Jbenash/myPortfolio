import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import aboutRoute from './routes/aboutRoutes.js'
import projectRoute from './routes/projectRoute.js'
import skillRoute from './routes/skillRoute.js'
import contactRoute from './routes/contactRoutes.js'
import downloadRoute from './routes/downloadRoute.js'
import { errorHandler, notFound } from './middleware/errorHandler.js';



const app = express();

dotenv.config();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Disposition', 'Content-Length', 'Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory with proper headers
app.use('/uploads', (req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length, Content-Type');

    // Don't set Content-Disposition here - let file type determine behavior
    // Only add download header for PDFs if explicitly requested
    if (req.path.endsWith('.pdf') && req.query.download === 'true') {
        res.setHeader('Content-Disposition', 'attachment');
    }
    next();
}, express.static('public'));

app.use("/api/about", aboutRoute)
app.use("/api/projects", projectRoute)
app.use("/api/skills", skillRoute)
app.use("/api/contact", contactRoute)
app.use("/api/download", downloadRoute)

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: "Server is running " })

})

//error handling middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
})

