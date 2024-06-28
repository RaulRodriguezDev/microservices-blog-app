const posts = {}

const handlePostCreated = (data) => {
    const { id, title } = data
    posts[id] = { id, title, comments: []}
}

const handleCommentCreated = (data) => {
    const { id, content, postId } = data
    const post = posts[postId]
    post.comments.push({ id, content })
}

const events = {
    'PostCreated': handlePostCreated,
    'CommentCreated': handleCommentCreated,
}

const handleEvent = (req, res) => {

    const { type, data } = req.body
    const eventHandler = events[type]
    eventHandler(data)

    res.status(210).send(type.toLowerCase())
}

const getPosts = (req, res) => res.send(posts)

export { handleEvent, getPosts }
