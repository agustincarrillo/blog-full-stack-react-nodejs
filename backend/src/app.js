import express from 'express'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
// Cors allows access to our backend from other URLs than the backed URL itself.
app.use(cors())

// bodyParser: middleware that reads the JSON body, giving a JavaScript
// object that we can easily access from our route definitions.
app.use(bodyParser.json())

postsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }
