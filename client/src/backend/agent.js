import axios from 'axios'
import { sleep } from '../helpers'

const postClient = axios.create({
    baseURL: 'http://localhost:4000/posts',
    headers: {
        'Content-Type': 'application/json'
    }
})

postClient.interceptors.response.use(async response => {
    await sleep(1000)
    return response
})

const commentsClient = axios.create({
    baseURL: 'http://localhost:4001/posts',
    headers: {
        'Content-Type': 'application/json'
    }
})

commentsClient.interceptors.response.use(async response => {
    await sleep(500)
    return response
})

const posts = {
    createPost: (title) => postClient.post('/',{ title }).then(response => response.data),
    getPosts: () => postClient.get('/')
}

const comments = {
    createComment: (content, postId) => commentsClient.post(`/${postId}/comments`,{ content })
        .then(response => response.data),
    getComments: () => commentsClient.get(`/comments`)
}

export { posts, comments }

