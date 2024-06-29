import axios from 'axios'
import { sleep } from '../helpers'
import { toast } from 'react-toastify'
import { Icon } from 'semantic-ui-react'

const postClient = axios.create({
    baseURL: 'http://localhost:4000/posts',
    headers: {
        'Content-Type': 'application/json'
    }
})

postClient.interceptors.response.use(async response => {
    await sleep(1000)
    console.log(response)
    toast.success('Post created')
    return Promise.resolve(response)
})

const commentsClient = axios.create({
    baseURL: 'http://localhost:4001/posts',
    headers: {
        'Content-Type': 'application/json'
    }
})

commentsClient.interceptors.response.use(async response => {
    await sleep(500)
    toast.info('Comment created', {
        icon: <Icon name='send'/>
    })        
    return Promise.resolve(response)
}, async error => {
    await sleep(500)
    toast.error("Error creating comment")
    return Promise.reject(error)
})

const queryClient = axios.create({
    baseURL: 'http://localhost:4002/posts'
})

const posts = {
    createPost: (title) => postClient.post('/',{ title })
}

const comments = {
    createComment: (content, postId) => commentsClient.post(`/${postId}/comments`,{ content })
        .then(response => response.data),
}

const queryService = {
    getPosts: () => queryClient.get('/')
}

export { posts, comments, queryService }

