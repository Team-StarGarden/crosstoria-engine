import express, { json, Request, Response } from "express";
import BaseRouter from "./routers";

import { createConnection } from "typeorm";
import "reflect-metadata";
import { generateKeyPair } from "crypto";

const connection = createConnection({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "crosstoria",
  entities: ["entity/*.ts"],
  migrations: ["./migration/*.ts"],
  migrationsRun: true,
  synchronize: true,
  logging: false,
  cli: {
    migrationsDir: "migration"
  }
})
  .then(async connection => {
    connection.synchronize();
    const app = express();

    app.use(json());

    app.get("/", (req: Request, res: Response) => {
      res.send({
        msg: "Hello, World!"
      });
    });

    //set Router
    app.use("/api", BaseRouter);
    app.get("*", (req: Request, res: Response) => {
      res.status(404).send({ error: "Not Found" });
    });

    app.listen(3000, () => {
      console.log("Crosstoria Engine is Listening...");
    });
  })
  .catch(error => console.log(error));
