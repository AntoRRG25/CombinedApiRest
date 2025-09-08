import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import * as eh from './Configs/errorHandlers.js'
import mainRouter from './routes.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(eh.jsonErrorHandler)
app.use(mainRouter)

app.use(eh.notFoundRoute)
app.use(eh.mainErrorHandler)
export default app
