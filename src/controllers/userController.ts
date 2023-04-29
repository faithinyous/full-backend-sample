import Express from "express";
import {User} from "@/entities";
import {PostgresDataSource} from "@/data-source";
// import {PostgresDataSource} from "@/data-source";
export default class UserController{
    public static async userList(req: Express.Request, res: Express.Response, next:Express.NextFunction): Promise<void> {
        // const userList =  await User.createQueryBuilder().cache(true)
        const userList =  await User.find({cache: true})
        res.send({ userList: userList})
    }
    public static async getUserBuId(req: Express.Request, res: Express.Response, next:Express.NextFunction): Promise<void> {
        console.log(req.params.id)
        const user =  await User.createQueryBuilder().cache(true).where("id = :id",{id:req.params.id}).getOne()
        console.log(user)
        res.send({ user: user})
    }
}