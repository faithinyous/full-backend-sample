require('dotenv').config()
import Logger from '@/utils/logger'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'
import path from 'path'
import morgan from 'morgan'
import morganBody from 'morgan-body'
import 'reflect-metadata'
import { PostgresDataSource } from './data-source'
import { createDatabase } from 'typeorm-extension'

// import dayjs from 'dayjs'
// import buddhistEra from 'dayjs/plugin/buddhistEra'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
// import { createConnections, getConnection } from 'typeorm'
// import { TypeormStore } from 'connect-typeorm'
// import { Session } from '@/entities/postgres/Session'

declare module 'express' {
  interface Request {
    user: any
  }
}

class App {
  public app: express.Application
  public port: number

  constructor(port: number) {
    // This is where the methods get called
    this.app = express()
    this.port = port
  }

  public initialize() {
    return new Promise(async (resolve, reject) => {
      try {
        // await App.connectToDatabase()
        // await App.initializeSession(this.app)
        this.initializeMiddleware()
        this.initializeRouter()
        this.initializeTemplateEngine()
        this.initializeExceptionHandler()
        resolve(this)
      } catch (err) {
        reject(err)
      }
    })
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: true,

        allowedHeaders: [
          '*',
          'Authorization',
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Methods',
          'content-type'
        ],
        optionsSuccessStatus: 200
        // credentials: true
      })
    )
    morganBody(this.app, {
      stream: {
        write: (message: any) => Logger.http({ message: message }) as any
      },
      prettify: false,
      includeNewLine: false
    })
    this.app.use(morgan('dev'))
    // this.app.use(bodyParser.json)
    this.app.use(
      bodyParser.urlencoded({
        limit: '1gb',
        extended: true,
        parameterLimit: 50000
      })
    )
    this.app.use(bodyParser.json({ limit: '1gb' }))
  }

  private initializeRouter() {
    this.app.use('/', router)
  }

  private initializeTemplateEngine() {
    this.app.set('view engine', 'pug')
    this.app.set('views', path.join(__dirname, 'views'))
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      Logger.info(`App listening on port ${this.port}`)
      //
    })
    server.setTimeout(1000 * 60 * 60)
  }

  private static async connectToDatabase() {
    // Logger.error('process.envprocess.envprocess.env', process.env)
    try {
      await createDatabase({ ifNotExist: true })
      await PostgresDataSource.initialize().then(async (res) => {
        //force run migration
        await res.runMigrations()
        Logger.info('Data Source has been initialized!')
      })
    } catch (err) {
      Logger.error('Error during Data Source initialization:', err)
      throw err
    }
  }

  private initializeExceptionHandler() {
    this.app.use(
      async (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          //Logger
          Logger.error({
            message: {
              status: 500,
              success: false,
              message: err.message || err || 'Unknown',
              stack: err.stack || '',
              payload: err.payload || 'unknown',
              code: err?.code || 'unknown'
              // user: req.session?.user || 'unknown'
            }
          })
          //response
          res.status(500).send({
            status: err.status || 400,
            success: false,
            message: err.message || err || 'Unknown',
            stack: err.stack || '',
            payload: err.payload,
            code: err?.code
          } as any)
        } catch (e) {
          Logger.error('Error on error Handler', e)
          next(e)
        }
      }
    )
  }

  // private static async initializeSession(app: any) {
  //   app.use(
  //     ExpressSession({
  //       resave: false,
  //       saveUninitialized: false,
  //       store: new TypeormStore({
  //         cleanupLimit: 2,
  //         limitSubquery: false,
  //         ttl: 86400
  //       }).connect(await getConnection().getRepository(Session)),
  //       secret: process.env.SESSION_SECRET
  //     })
  //   )
  // }
}

export default App
