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
  entities: [dir + 'src/entities/*.ts'],
  migrations: [dir + '/migrations/*.ts'],
  migrationsRun: true
})

export { PostgresDataSource }
