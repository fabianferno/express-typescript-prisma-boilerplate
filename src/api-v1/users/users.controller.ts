//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await prisma.users.findMany();
      return res.status(200).json({
        message: "Success",
        users,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}
