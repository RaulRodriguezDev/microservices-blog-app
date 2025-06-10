import axios from 'axios'
import { randomBytes } from 'crypto'

const eventBus = axios.create({
    baseURL: 'http://localhost:4005/events',
})

const posts = {}

const getPosts = (req, res) => {

    res.send(posts)
}

const createPost = (req, res, next) => {

    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = { id, title }
    req.body.id = id

    res.status(201).send(posts[id])

    next()

}

const sendPostCreatedEvent = async (req, res) => {

    const data = req.body

    await eventBus.post('/', {
        type: 'PostCreated',
        data,
    })
    
}

export { getPosts, createPost, sendPostCreatedEvent }