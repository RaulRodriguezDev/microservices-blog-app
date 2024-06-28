import express from 'express'
import cors from 'cors'
import postsRouter from './routes/postRoutes.js'
const app = express()


app.use(express.json())
app.use(cors())
app.use('/', postsRouter )


app.listen(4000, () => {
    console.log('Posts service is running on port 4000')
})