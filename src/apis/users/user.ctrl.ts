import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Users } from "../../entity/Users";
import { insertUser } from "./user.func";
import validateEmail from "../../util/EmailChecker";

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  if ("userName" in data && "email" in data && "age" in data) {
    try {
      //check for email form
      if (!validateEmail(data.email)) {
        throw new Error("BAD_REQUEST");
      }
      //check for age
      if (
        !Number.isInteger(data.age) ||
        data.age < 1 ||
        data.age > 2 * 100000 * 10000
      ) {
        throw new Error("BAD_REQUEST");
      }
      await insertUser(data);
      res.status(200).send({
        result: "success"
      });
      // TODO: send Password initializing E-mail
    } catch (error) {
      if (error.message == "ER_DUP_ENTRY" || error.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          error: "ER_DUP_ENTRY"
        });
      } else if (error.message == "BAD_REQUEST") {
        res.status(400).send({
          error: "BAD_REQUEST"
        });
      } else {
        console.log(error.message);
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
  if (!("id" in req.body)) {
    res.status(400).send({
      error: "invalid_request"
    });
    return;
  }
  const ID = req.body.id;
  const idCount = await getConnection()
    .createQueryBuilder()
    .select("userID")
    .from(Users, "users")
    .where("users.userID = :Id", { Id: ID })
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

export const setPassphrase = (req: Request, res: Response) => {
  if ("email" in req.session! && "users" in req.session!) {
    res.status(401).send({
      error: "Not Defined"
    });
  } else {
    res.status(403).send({
      error: "Unauthorized"
    });
  }
};

export const authorize = async (req: Request, res: Response) => {
  let item = null;
  if ("email" in req.body && "pwd" in req.body) {
    const email = req.body.email;
    if (!validateEmail(email)) {
      res.status(400).send({
        result: "BAD_REQUEST"
      });
      return;
    }
    //TODO:hashing password
    const password = req.body.pwd;
    item = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Users, "users")
      .where("users.email = :email AND users.passphrase = :PassPhrase", {
        email: email,
        PassPhrase: password
      })
      .getRawOne();
  }
  if (!item || item == null) {
    res.status(200).send({
      result: "failed"
    });
  } else {
    req.session!.email = item.email;
    req.session!.user = item.userName;
    req.session!.userState = item.userState;
    req.session!.isAdmin = false;
    res.status(200).send({
      result: "success"
    });
  }
};

export const unauthorize = (req: Request, res: Response) => {
  delete req.session!.user;
  delete req.session!.email;
  delete req.session!.userState;
  delete req.session!.isAdmin;
  res.status(200).send(null);
};

export const userInfo = async (req: Request, res: Response) => {
  if ("email" in req.body) {
    const email = req.body.email;
    if (!validateEmail(email)) {
      res.status(400).send({
        result: "BAD_REQUEST"
      });
      return;
    }
    const item = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Users, "users")
      .where("users.email = :Email", { Email: email })
      .getRawOne();
    if (!item || item == null) {
      res.status(404).send({ error: "Not_Found" });
    } else {
      res.status(200).send({
        name: item.userName,
        age: item.age,
        gender:
          item.openGender || req.session!.email == item.email
            ? item.gender
            : null,
        state: item.state,
        pendingDate: item.pendingDate
      });
    }
  } else {
    res.status(400).send({
      error: "invalid_request"
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!("user" in req.session!) || req.session!.user == null) {
      throw new Error("Unauthorized");
    }
    if (!("age" in data && "gender" in data && "userName" in data)) {
      throw new Error("BAD_REQUEST");
    }
    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({
        age: data.age,
        gender: data.gender,
        userName: data.userName
      })
      .where("email = :Email and userName = :uName", {
        Email: req.session!.email,
        uName: req.session!.user
      })
      .execute();
    req.session!.user = data.userName;
    res.status(200).send({
      result: "success"
    });
  } catch (error) {
    if (error.message == "BAD_REQUEST") {
      res.status(400).send({
        error: "BAD_REQUEST"
      });
    } else if (error.message == "Unauthorized") {
      res.status(403).send({
        error: "Unauthorized"
      });
    } else {
      res.status(400).send({
        error: "invalid_request"
      });
    }
  }
};
