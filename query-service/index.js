import express from 'express'
import cors from 'cors'
import queryRoutes from './routes/queryRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', queryRoutes)

app.listen(4002, () => {
    console.log('Query service listening on port 4002')
})   