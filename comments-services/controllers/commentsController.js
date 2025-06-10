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

    req.body.data = { id: commentId, content, postId, status: 'Pending' }
    req.body.type = "CommentCreated"
    
    const comments = commentsByPostId[postId] || []
    comments.push({ id: commentId, content, status: req.body.data })

    commentsByPostId[postId] = comments

    res.status(201).json({ id: commentId, content, status: req.body.data.status })

    next()
}

const sendEvent = async (req,res) => {
    
    const { type, data } = req.body
    console.log(data)
    await eventBusClient.post('/',{
        type,
        data
    
    })
}

const handleEvent = (req, res, next) => {
    const { type, data } = req.body
    
    console.log('Event received:', type)

    if(type === 'CommentModerated'){
        const { postId, id, status } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => comment.id === id)

        comment.status = status

        req.body = { type: "CommentUpdated", data: {
            postId,
            id,
            status,
            content: data.content
        }}

        next()
    }
    
    res.send({})
}
export { getComments, createComment, sendEvent, handleEvent }