import express from 'express'
import { randomBytes } from 'crypto'

const app = express()
const commentsByPostId = {}

app.use(express.json())

app.get('posts/:id/comments', (req, res) => {
    const postId = req.params.id

    res.send(commentsByPostId[postId] || [])

})

app.post('posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id
    
    const comments = commentsByPostId[postId] || []
    comments.push({ id: commentId, content })

    commentsByPostId[postId] = comments

    res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Comments service is running on port 4001')
})