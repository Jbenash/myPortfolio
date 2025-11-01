import express from 'express'
import { body } from 'express-validator'
import { submitContact } from '../controllers/contactController.js'

const router = express.Router()

const contactValidator = [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('email').trim().isEmail().withMessage('valid email is required'),
    body('subject').trim().notEmpty().withMessage('subject is required'),
    body('message').trim().notEmpty().withMessage('message is required')
]

router.route('/')
    .post(contactValidator, submitContact)

export default router