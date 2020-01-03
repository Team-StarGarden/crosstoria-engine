import { Request, Response, Router, Express } from "express";

// Init shared
const router = Router();

router.post("/register", (req: Request, res: Response) => {
  res.status(401).send({
    error: "Not Defined"
  });
});

router.post("/setPassword", (req: Request, res: Response) => {
  res.status(401).send({
    error: "Not Defined"
  });
});

router.post("/authorize", (req: Request, res: Response) => {
  res.status(200).send({
    result: "seuccess",
    userName: "userName"
  });
});

export default router;
