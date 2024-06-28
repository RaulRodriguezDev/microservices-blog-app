import express from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import commentsRoutes from './routes/commentsRoutes.js'

const app = express()
const commentsByPostId = {}

app.use(express.json())

app.use(cors())
app.use('/', commentsRoutes )

app.listen(4001, () => {
    console.log('Comments service is running on port 4001')
})