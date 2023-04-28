import Express from "express";
import {User} from "@/entities";
import {PostgresDataSource} from "@/data-source";
export default class UserController{
    public static async userList(req: Express.Request, res: Express.Response, next:Express.NextFunction): Promise<void> {
        const userList =  await PostgresDataSource.query(`SELECT * FROM "user"`)
        res.send({ userList: userList}
        )
    }
}