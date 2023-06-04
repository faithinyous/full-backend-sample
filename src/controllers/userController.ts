import Express from 'express'
import { Book, User } from '@/entities'
import { PostgresDataSource } from '@/data-source'
// import {PostgresDataSource} from "@/data-source";
export default class UserController {
  public static async userList(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    try {
      const userList = await User.find({ cache: true, relations: ['book'] })
      res.send({ userList: userList })
    } catch (e) {
      res.status(500).send({ message: 'Something went wrong' })
    }
  }

  public static async getUserBuId(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    try {
      const user = await User.createQueryBuilder()
        .cache(true)
        .where('id = :id', { id: req.params.id })
        .getOne()
      console.log(user)
      res.send({ user: user })
    } catch (e) {
      res.status(500).send({ message: 'Something went wrong' })
    }
  }
}
