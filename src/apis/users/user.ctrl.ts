import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Users } from "../../entity/Users";
import { insertUser } from "./user.func";
import validateEmail from "../../util/EmailChecker";

export const register = async (req: Request, res: Response) => {
  let data = req.body;
  console.log(data);
  if ("userName" in data && "email" in data && "age" in data) {
    try {
      if (!validateEmail(data.email)) {
        throw new Error("BAD_REQUEST");
      }
      await insertUser(data);
      res.status(200).send({
        result: "success"
      });
      // TODO: send Password initializing E-mail
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          error: "ER_DUP_ENTRY"
        });
      } else if (error.code == "BAD_REQUEST") {
        res.status(400).send({
          error: "BAD_REQUEST"
        });
      } else {
        res.status(451).send({
          error: "invalid"
        });
      }
    }
  } else {
    res.status(400).send({
      error: "invalid_request"
    });
  }
};

export const availableID = async (req: Request, res: Response) => {
  let ID = req.body.id;
  let idCount = await getConnection()
    .createQueryBuilder()
    .select("email")
    .from(Users, "users")
    .where("users.email = :Id", { Id: ID })
    .getCount();
  res.status(200).send(
    idCount == 0
      ? {
          result: "valid"
        }
      : {
          result: "unavailable"
        }
  );
};

export const setPassphrase = async (req: Request, res: Response) => {
  res.status(401).send({
    error: "Not Defined"
  });
};

export const authorize = async (req: Request, res: Response) => {
  let email = req.body.email;
  let password = req.body.pwd;
  let count = await getConnection()
    .createQueryBuilder()
    .select("email")
    .from(Users, "users")
    .where("users.email = :email AND users.passphrase = :PassPhrase", {
      email: email,
      PassPhrase: null
    })
    .getCount();
  if (count != 0) {
    res.status(200).send({
      result: "failed"
    });
  } else {
    res.status(200).send({
      result: "success"
    });
  }
};
