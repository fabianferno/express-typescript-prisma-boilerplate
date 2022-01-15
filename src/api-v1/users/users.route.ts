import { Router } from "express";
import Controller from "./users.controller";

const users: Router = Router();
const controller = new Controller();

// Retrieve all Users
users.get("/", controller.getAllUsers);
users.get("/:email", controller.getUser);

users.put("/", controller.upsertUser);

users.get("/:_id/projects", controller.getProjects);

export default users;
