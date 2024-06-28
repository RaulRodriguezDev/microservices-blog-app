import express from 'express'
import { getPosts, handleEvent } from '../controllers/queryController.js'
const router = express.Router()

router.get('/posts', getPosts)

router.post('/events', handleEvent)

export default router