import express from 'express';
import { getAbout } from '../controllers/aboutController.js';

const router = express.Router()

router.route("/").get(getAbout)

export default router 