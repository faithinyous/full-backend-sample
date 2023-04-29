import Express from "express";
import {Book, User} from "@/entities";
import {PostgresDataSource} from "@/data-source";
// import {PostgresDataSource} from "@/data-source";
export default class UserController{
    public static async userList(req: Express.Request, res: Express.Response, next:Express.NextFunction): Promise<void> {
        // const userList =  await User.createQueryBuilder().cache(true)
        // const userList =  await User.find({cache: true,relations:["book"]})
        const userList =  await Book.find({cache: true,relations:["user"]})
        // await PostgresDataSource.createQueryRunner("master").query(``)
        // const test_data = await User.query(`SELECT * FROM "user"`)
        // const data  = await PostgresDataSource.query(`SELECT * FROM "user"`)
        // console.log(data)
        res.send({ userList: userList})
    }
    public static async getUserBuId(req: Express.Request, res: Express.Response, next:Express.NextFunction): Promise<void> {
        console.log(req.params.id)
        const user =  await User.createQueryBuilder().cache(true).where("id = :id",{id:req.params.id}).getOne()
        console.log(user)
        res.send({ user: user})
    }


}