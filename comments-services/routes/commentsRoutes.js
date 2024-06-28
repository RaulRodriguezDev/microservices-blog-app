import express from 'express'
import { createComment, getComments, sendCommentCreatedEvent } from '../controllers/commentsController.js'

const router = express.Router()

router.get('/posts/comments', getComments)
router.post('/posts/:id/comments', createComment, sendCommentCreatedEvent)
router.post('/events', (req, res) => {
    console.log('Received event:', req.body.type)
    res.send({})
})

export default router