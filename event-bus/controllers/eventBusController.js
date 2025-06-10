import { Agent } from '../gateway/agent.js'

const client = new Agent()
const events = []

const sendEvent = async (req, res) => {
    console.log('Received event:', req.body)
    const event = req.body
    events.push(event)

    await client.sendEventToPostService(event)
    await client.sendEventToCommentsService(event)
    await client.sendEventToQueryService(event)
    await client.sendEventToModerationService(event)

    console.log(client.response)

}

const getEvents = (req, res) => {
    res.status(200).json(events)
}

export { sendEvent, getEvents }