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
  entities: [dir + '/entities/**/*{.js,.ts}'],
  migrations: [dir + '/migrations/**/*{.js,.ts}'],
  migrationsRun: true,
  synchronize:true
})
console.log(process.env.POSTGRES_HOST)
console.log(dir + '/entities/**/*{.js,.ts}')

export { PostgresDataSource }
