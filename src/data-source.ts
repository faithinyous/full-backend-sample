import * as process from "process";

require('dotenv').config()
import { DataSource } from 'typeorm'
const dir = __dirname
const PostgresDataSource = new DataSource({
  type: 'postgres',
  replication: {
    master: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE
    },
    slaves: [
      {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
      }
    ]
  },
  logging: true,
  entities: [dir +'/entities/**/*{.js,.ts}'],
  migrations: [dir + '/migrations/**/*{.js,.ts}'],
  migrationsRun: true,
  cache: {
    type: "ioredis",
    duration: 30000,
      options: {
          startupNodes: [
            {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
          }
        ],
        scaleReads: 'all',
        redisOptions: {
          maxRetriesPerRequest: 1
        },
        ignoreErrors: true
      }
    }
})

export { PostgresDataSource }
