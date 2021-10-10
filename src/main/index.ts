import express from 'express'
import MongoHelper from '../infra/helpers/mongo-helper'
import { setupRoutes } from './routes/setup-routes'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import { setupWorker } from './workers/setup-workers'

dotenv.config({ path: path.join(__dirname, '/../../.env') })

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => {
    const app = express()
    app.use(cors())
    setupRoutes(app)
    setupWorker()
    app.listen(process.env.PORT ?? 8080, () => console.log('Server is running!'))
  })
  .catch((e) => {
    console.log(e)
  })
