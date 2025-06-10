import express from 'express'
import cors from 'cors'
import queryRoutes from './routes/queryRoutes.js'
import { getEvents, handleEvent, handleEventNoResponse } from './controllers/queryController.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', queryRoutes)

app.listen(4002, async () => {
    console.log('Query service listening on port 4002')

    const events = await getEvents()

    if(events.length > 0) {
        for(let event of events){
            console.log('Processing event:', event.type)
            const { type, data } = event
            handleEventNoResponse(type, data)
        }
    }
})   