import { Router } from 'express'
// import apiV1 from './v1'
import Logger from '@/utils/logger'
// import axios from 'axios'
const router: Router = Router()
// router.use('/v1', apiV1)
router.get('/version', (req, res) => {
  Logger.info('version')
  res.send({ version: '1.0.0' })
})
export default router
