import App from './app2'
import Logger from '@/utils/logger'
// import validateEnv from './utils/validateEnv'
// validateEnv() //==> Validate the .env.template variables below
const server = new App(parseInt(process.env.PORT) || 5000)
// app
//   .initialize()
//   .then(() => {
//     app.listen()
//   })
//   .catch((err) => {
//     Logger.error('Failed to start server', err)
//   })
server
  .initialize()
  .then(async () => {
    await server.listen()
  })
  .catch((err) => {
    server.app.log.error('Failed to start server', err)
  })
