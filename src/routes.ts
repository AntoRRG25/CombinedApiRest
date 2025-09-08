import express, { type Request, type Response, type NextFunction } from 'express'

const mainRouter = express.Router()
mainRouter.get('/',
  (req: Request, res: Response) => {
    return res.status(200).json('Hola estoy en typescript')
  }
)
export default mainRouter
