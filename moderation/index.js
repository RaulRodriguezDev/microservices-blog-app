import express from 'express'
import router from './routes/moderationRoutes.js'


const app = express()

app.use(express.json())
app.use('/', router)

app.listen(4003, (req, res) => {
    console.log('Moderation serivce is listening on 4003')
})