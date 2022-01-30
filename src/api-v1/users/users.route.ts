import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

// Retrieve all Users
users.get("/", controller.getAllUsers);

export default users;
