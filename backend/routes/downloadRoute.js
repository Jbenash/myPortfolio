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

    // Get file stats for proper content-length
    const stat = fs.statSync(filePath);

    // Set comprehensive headers for cross-browser and mobile compatibility
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', 'attachment; filename="Ben_Asher_Resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Stream the file instead of using sendFile for better reliability
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => {
        console.error('Error streaming file:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error downloading file' });
        }
    });

    fileStream.pipe(res);
});

export default router;