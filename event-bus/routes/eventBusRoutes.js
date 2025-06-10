import express from 'express'
import { getEvents, sendEvent } from '../controllers/eventBusController.js'

const router = express.Router()

router.post('/events', sendEvent )
router.get('/events', getEvents)
export default router