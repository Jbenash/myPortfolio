import Contact from '../model/Contact.js';
import { validationResult } from 'express-validator';

export const submitContact = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, subject, message } = req.body

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            })
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        })

        res.status(201).json({
            success: true,
            message: 'Contact message sent successfully',
            data: contact
        })

    } catch (error) {
        console.error('Contact submission error:', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}
