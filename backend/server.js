import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import aboutRoute from './routes/aboutRoutes.js'
import projectRoute from './routes/projectRoute.js'
import skillRoute from './routes/skillRoute.js'
import contactRoute from './routes/contactRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js';



const app = express();

dotenv.config();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/about", aboutRoute)
app.use("/api/projects", projectRoute)
app.use("/api/skills", skillRoute)
app.use("/api/contact", contactRoute)

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

