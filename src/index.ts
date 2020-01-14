import express, { json, Request, Response } from "express";
import BaseRouter from "./routers";

import cors from "cors";
import { createConnection } from "typeorm";
import "reflect-metadata";

import { generateKeyPair } from "crypto";

const cornsOptions: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token"
  ],
  // credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3000",
  preflightContinue: false
};

export const connection = createConnection({
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
    app.use(cors(cornsOptions));
    app.use(json());

    app.get("/", (req: Request, res: Response) => {
      res.send({
        msg: "Hello, World!"
      });
    });

    app.use("*", cors(cornsOptions));
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
