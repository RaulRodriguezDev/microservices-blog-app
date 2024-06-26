import express from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'

const app = express()
const commentsByPostId = {}

app.use(express.json())

app.use(cors())

app.get('/posts/comments', (req, res) => res.send(commentsByPostId))

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id
    
    const comments = commentsByPostId[postId] || []
    comments.push({ id: commentId, content })

    commentsByPostId[postId] = comments

    res.status(201).send('Comment created')
})

app.listen(4001, () => {
    console.log('Comments service is running on port 4001')
})