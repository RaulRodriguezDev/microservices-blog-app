import axios from 'axios'

const busEventClient = axios.create({
    baseURL: 'http://localhost:4005'
})

const handleCommentCreated = (data) => {
    const {  content } = data
    return /orange/i.test(content) ? 'Rejected' : 'Approved'
}

const handleEvent = (req, res, next) => {
    const { type, data } = req.body
    console.log('Event received: ',type)

    if(type === "CommentCreated"){
        const status = handleCommentCreated(data)
        req.body.data.status = status

        next()
    }
    
    res.send({})
}

const sendEvent = async (req, res) => {
    await busEventClient.post('/events',{
        type: "CommentModerated",
        data: req.body.data
    }).then(() => {
        res.status(200)
    }).catch((error) => {
        console.log(error)
        res.status(500)
    })
}

export { handleEvent, sendEvent }