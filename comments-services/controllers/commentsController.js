import { randomBytes } from 'crypto'
import axios from 'axios'

const eventBusClient = axios.create({
    baseURL: 'http://localhost:4005/events',
})
const commentsByPostId = {}

const getComments = (req,res) => res.send(commentsByPostId)

const createComment = (req,res,next) => {
    
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id

    req.body = { id: commentId, content, postId }
    
    const comments = commentsByPostId[postId] || []
    comments.push({ id: commentId, content })

    commentsByPostId[postId] = comments

    res.status(201).send('Comment created')

    next()
}

const sendCommentCreatedEvent = async (req,res) => {
    
    const data = req.body

    await eventBusClient.post('/',{
        type: 'CommentCreated',
        data
    
    })
}

export { getComments, createComment, sendCommentCreatedEvent }