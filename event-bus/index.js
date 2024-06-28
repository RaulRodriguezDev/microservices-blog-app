import express from 'express'
import eventBusRoutes from './routes/eventBusRoutes.js'

const app = express()

app.use(express.json())
app.use('/', eventBusRoutes)

app.listen(4005, () => {
    console.log("Event bus listening on 4005")
})