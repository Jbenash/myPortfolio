import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle OPTIONS request for CORS preflight
router.options('/resume', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length, Content-Type');
    res.status(200).end();
});

// Download resume endpoint
router.get('/resume', (req, res) => {
    const filePath = path.join(__dirname, '../public/files/resume.pdf');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).json({ error: 'File not found' });
    }

    try {
        // Read the entire file into buffer to prevent corruption
        const fileBuffer = fs.readFileSync(filePath);
        const stat = fs.statSync(filePath);

        // Set comprehensive headers for cross-browser and mobile compatibility
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', fileBuffer.length);
        res.setHeader('Content-Disposition', 'attachment; filename="Ben_Asher_Resume.pdf"');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length, Content-Type');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Accept-Ranges', 'bytes');

        // Send the complete buffer
        res.end(fileBuffer, 'binary');
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Error downloading file' });
    }
});

export default router;