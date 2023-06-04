import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

import { createDatabase } from 'typeorm-extension'
import { PostgresDataSource } from '@/data-source'
import Logger from '@/utils/logger'
import cors from '@fastify/cors'
import router from '@/routes'

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}
class App {
  public app: FastifyInstance
  public port: number
  constructor(port: number) {
    // This is where the methods get called
    this.app = Fastify({
      logger: true
    })
    this.port = port
  }
  public initialize() {
    return new Promise(async (resolve, reject) => {
      try {
        await App.connectToDatabase()
        // await App.initializeSession(this.app)
        await this.initializeMiddleware()
        this.initializeRouter()
        // this.initializeTemplateEngine()
        // this.initializeExceptionHandler()
        resolve(this)
      } catch (err) {
        reject(err)
      }
    })
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
  private async initializeMiddleware() {
    await this.app.register(cors, {
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
  }
  private initializeRouter() {
    // this.app.register(require('./routes'), { prefix: '/' })
    this.app.get('/', opts, async (request, reply) => {
      request.log.error('Some info about the current request')
      return { pong: 'it worked!' }
    })
  }
  private initializeTemplateEngine() {
    this.app.register(require('fastify-pug'), { views: 'views' })
  }
  public async listen() {
    this.app.register(require('fastify-server-timeout'), {
      serverTimeout: 1000 * 60 * 60
    })
    await this.app.listen({ port: this.port })
  }
}

export default App
