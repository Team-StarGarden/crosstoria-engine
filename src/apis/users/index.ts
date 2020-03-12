import { Router } from "express";
import * as ctrl from "./user.ctrl";

export const UserRouter = Router();

UserRouter.post("/register", ctrl.register);
UserRouter.post("/availableID", ctrl.availableID);
UserRouter.post("/setPassphrase", ctrl.setPassphrase);
UserRouter.post("/authorize", ctrl.authorize);
UserRouter.post("/update", ctrl.update);
UserRouter.get("/unauthorize", ctrl.unauthorize);
UserRouter.get("/userInfo", ctrl.userInfo);
