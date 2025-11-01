import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Download resume endpoint
router.get('/resume', (req, res) => {
    const filePath = path.join(__dirname, '../public/files/resume.pdf');
    
    res.download(filePath, 'Ben_Asher_Resume.pdf', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: 'Error downloading file' });
        }
    });
});

export default router;
