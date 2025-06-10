import express from 'express'
import { createComment, getComments, handleEvent, sendEvent } from '../controllers/commentsController.js'

const router = express.Router()

router.get('/posts/comments', getComments)
router.post('/posts/:id/comments', createComment, sendEvent)
router.post('/events', handleEvent, sendEvent)

export default router