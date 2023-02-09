import { Request, Response, Router } from "express";
import { createUserEmailPassword } from "./createuser.js";

const userRouter = Router();

userRouter.get("/u", (req: Request, res: Response) => {
  res.send("User route");
});

userRouter.post("/u/register", async (req: Request, res: Response) => {
  const user = req.body.user;

  await createUserEmailPassword(user)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error)
    });
});

export default userRouter;
