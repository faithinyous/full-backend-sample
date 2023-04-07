require('dotenv').config()
import { DataSource } from 'typeorm'
const dir = __dirname
const PostgresDataSource = new DataSource({
  name: 'postgres',
  type: 'postgres',
  // host: '/cloudsql/betvoom:asia-southeast1:voombet',
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
  // host: process.env.POSTGRES_HOST,
  // port: parseInt(process.env.POSTGRES_PORT),
  // database: process.env.POSTGRES_DATABASE,
  // username: process.env.POSTGRES_USERNAME,
  // password: process.env.POSTGRES_PASSWORD,
  // synchronize: true,
  logging: ['error'],
  entities: [dir + '/entities/postgres/**/*{.ts,.js}'],
  migrations: [dir + '/migrations/postgres/**/*{.ts,.js}'],
  // subscribers: [dir + '/subscriber/**/*{.ts}', dir + '/subscriber/**/*{.js}']
  migrationsRun: true
})

export { PostgresDataSource }
