import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Download resume endpoint
router.get('/resume', (req, res) => {
    const filePath = path.join(__dirname, '../public/files/resume.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).json({ error: 'File not found' });
    }

    // Set proper headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Ben_Asher_Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error downloading file' });
            }
        }
    });
});

export default router;