import express from 'express'
import { getPosts, createPost, sendPostCreatedEvent } from '../controllers/postController.js'
const router = express.Router()

router.get('/posts', getPosts)
router.post('/posts', createPost, sendPostCreatedEvent)
router.post('/events', (req, res) => {
    console.log('Received event:', req.body.type)
    res.send({})
})

export default router