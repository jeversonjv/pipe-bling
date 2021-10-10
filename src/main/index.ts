import express from 'express'
import MongoHelper from '../infra/helpers/mongo-helper'
import { setupRoutes } from './routes/setup-routes'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import { GetDealsSaveOrders } from './workers/get-deals-save-orders'

dotenv.config({ path: path.join(__dirname, '/../../.env') })

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => {
    const app = express()
    app.use(cors())
    setupRoutes(app)
    void GetDealsSaveOrders()
    app.listen(process.env.port ?? 8080, () => console.log('Server is running!'))
  })
  .catch((e) => {
    console.log(e)
  })
