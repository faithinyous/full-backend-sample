const winston = require('winston')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  return process.env.NODE_ENV !== 'development' ? 'info' : 'debug'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize(),
  winston.format.printf(
    (info: any) =>
      `${info.timestamp} ${info.level}: ${
        typeof info.message === 'object'
          ? JSON.stringify(info.message)
          : info.message
      }`
  )
)
const transports = [new winston.transports.Console()] as any[]

//Development
if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  )
  transports.push(new winston.transports.File({ filename: 'logs/all.log' }))
}

//Production
// if (process.env.NODE_ENV !== 'development') {
// transports.push(new ElasticsearchTransport(levels))
// }

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

Logger.on('error', (error: Error) => {
  console.error('Error in logger caught', error)
})

export default Logger
