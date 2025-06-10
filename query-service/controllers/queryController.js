import axios from 'axios'
const posts = {}
const busClient = axios.create({
    baseURL: 'http://localhost:4005/events'
})

const handlePostCreated = (data) => {
    const { id, title } = data
    posts[id] = { id, title, comments: []}
}

const handleCommentCreated = (data) => {
    const { id, content, postId, status } = data
    const post = posts[postId]
    post.comments.push({ id, content, status })
}

const handleCommentUpdated = (data) => {
    const { id, postId, content, status } = data

    const post = posts[postId]
    const comment = post.comments.find(comment => comment.id === id)

    comment.status = status
    comment.content = content
}

const events = {
    'PostCreated': handlePostCreated,
    'CommentCreated': handleCommentCreated,
    'CommentUpdated': handleCommentUpdated,
}

const handleEvent = (req, res) => {
    const { type, data } = req.body
    console.log('Event received: ', type)

    const eventHandler = events[type]
    if (typeof eventHandler === 'function') {
        eventHandler(data)
        res.status(200).send(type.toLowerCase())
    } else {
        res.status(400).send('Unknown event type')
    }
}

const handleEventNoResponse = (type, data) => {
    console.log('Event received: ', type)

    const eventHandler = events[type]
    if (typeof eventHandler === 'function') {
        eventHandler(data)
    } else {
        console.error('Unknown event type:', type)
    }
}

const getPosts = (req, res) => res.send(posts)
const getEvents = async () => {
    try {
        const response = await busClient.get('/')
        return response.data
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}
export { handleEvent, handleEventNoResponse, getPosts, getEvents }
