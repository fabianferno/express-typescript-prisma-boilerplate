import { Router } from "express";
import Controller from "./projects.controller";

const projects: Router = Router();
const controller = new Controller();

projects.get("/", controller.getAllProjects); // Get all projects

projects.post("/create", controller.createProject); // Create a new project

projects.put("/:_id/users", controller.addUser); // Create a new project
projects.delete("/:_id/users", controller.removeUser); // Create a new project

projects.get("/:_id/tickets", controller.getTickets); // Create a new project
projects.post("/:_id/tickets", controller.createTicket); // Create a new project
projects.put("/:_id/tickets", controller.updateTicket); // Update a new project
projects.delete("/:_id/tickets", controller.deleteTicket); // Update a new project

projects.get("/:_id", controller.getProject); // Get a project by id
projects.put("/:_id", controller.updateProject); // Update a project by id
projects.delete("/:_id", controller.deleteProject); // Delete a project by id

export default projects;
