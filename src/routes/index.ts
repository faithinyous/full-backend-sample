import { Router } from 'express'
// import apiV1 from './v1'
import Logger from '@/utils/logger'
import UserController from "@/controllers/userController";
// import axios from 'axios'
const router: Router = Router()
// router.use('/v1', apiV1)
router.get('/version', (req, res) => {
  Logger.info('version')
  res.send({ version: '1.0.0' })
})

router.get('/users', UserController.userList)
export default router
