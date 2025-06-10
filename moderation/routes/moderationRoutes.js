import express from 'express'
import { handleEvent, sendEvent } from '../controllers/moderationController.js'

const router = express.Router()

router.post('/events', handleEvent, sendEvent)

export default router