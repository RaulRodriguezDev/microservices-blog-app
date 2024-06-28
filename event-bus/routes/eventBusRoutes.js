import express from 'express'
import { sendEvent } from '../controllers/eventBusController.js'

const router = express.Router()

router.post('/events', sendEvent )

export default router