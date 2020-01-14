import { Request, Response, Router, Express } from "express";
import { getConnection } from "typeorm";
import { Users } from "../entity/Users";

// Init shared
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  let data = req.body;
  console.log(data)
  if ("userName" in data && "email" in data && "age" in data) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        email: data.email,
        age: data.age,
        userName: data.userName,
        userState: "outstanding Authozation",
        gender: "unSelected"
      })
      .execute()
      .then(() => {
        res.status(401).send({
          result: "success"
        });
        //send settPassword E-mail
      });
  } else {
    res.status(401).send({
      error: "invalid_request"
    });
  }
});
router.get("/availableID", async (req: Request, res: Response) => {
  let ID = req.body.id;
  let idCount = await getConnection()
    .createQueryBuilder()
    .select("userID")
    .from(Users, "users")
    .where("users.userID = :Id", { Id: ID })
    .getCount();
  res.status(200).send(
    idCount == 0
      ? {
          result: "valiable"
        }
      : {
          result: "unavailable"
        }
  );
});
router.post("/setPassword", async (req: Request, res: Response) => {
  res.status(401).send({
    error: "Not Defined"
  });
});

router.post("/authorize", async (req: Request, res: Response) => {
  res.status(200).send({
    result: "failed"
  });
});

export default router;
