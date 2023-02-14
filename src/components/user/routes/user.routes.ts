import "express-async-errors";
import { NextFunction, Request, Response, Router } from "express";
import { hash } from "bcrypt";

import { createUser } from "../controllers/user.create.js";
import userSchema from "../models/user.schema.js";
import { Login } from "../controllers/user.login.js";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("Default landing page route");
});

userRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    await userSchema.validateAsync(user).catch((error) => next(error));

    user.password = await hash(user.password, 10).catch((error) => next(error));

    await createUser(user)
      .then((result) => {
        req.session["user"] = result;
        res.redirect("/protected");
      })
      .catch((error) => {
        next(error);
      });
  }
);

userRouter.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    await userSchema.validateAsync(user).catch((error) => next(error));

    await Login(user)
      .then((result) => {
        req.session["user"] = result;
        res.redirect("/protected");
      })
      .catch((error) => next(error));
  }
);

userRouter.get(
  "/logout",
  async function (req: Request, res: Response, next: NextFunction) {
    req.session.destroy((error) => {
      console.log("done");
      res.redirect("/");
    });
  }
);

export default userRouter;
