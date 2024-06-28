import { Agent } from '../gateway/agent.js'

const client = new Agent()

const sendEvent = async (req, res) => {
    console.log('Received event:', req.body)
    const event = req.body

    await Promise.all([
        client.sendEventToPostService(event),
        client.sendEventToCommentsService(event),
        client.sendEventToQueryService(event)
    ])
    .then(() => res.status(200).send('Event sent to all services'))
    .catch(err => {
        console.error(err)
        res.status(500).send('Error sending event to services')
    })
}

export { sendEvent }