import { Router } from "express";
import jwtAuthCheck from "../helpers/verifyToken";

import users from "./users/users.route";
import projects from "./projects/projects.route";

const router: Router = Router();

router.use("/users", jwtAuthCheck, users); // Authenticate
router.use("/projects", projects);

export default router;
