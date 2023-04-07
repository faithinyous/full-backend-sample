import App from './app'
import Logger from '@/utils/logger'
// import validateEnv from './utils/validateEnv'
// validateEnv() //==> Validate the .env.template variables below
const app = new App(parseInt(process.env.PORT) || 5000)
app
  .initialize()
  .then(() => {
    app.listen()
  })
  .catch((err) => {
    Logger.error('Failed to start server', err)
  })
