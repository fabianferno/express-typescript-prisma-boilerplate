import * as dotenv from "dotenv";
dotenv.config();

import server from "./api";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

server.listen(process.env.API_PORT || "5000", () => {
  console.log(
    `The API server has successfully started. \nListening at ${
      process.env.APP_BASE_URL || "http://localhost:5000"
    }`
  );
});

process.on("SIGINT", function () {
  prisma.$disconnect(); // Disconnect from Prisma
  console.log("Prisma Disconnected.");
  process.exit(0);
});
