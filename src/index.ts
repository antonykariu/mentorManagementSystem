import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./components/user/routes/user.routes.js";
import session from "express-session";
import { verifySession } from "./components/user/utils/user.session.js";
dotenv.config();

const app = express();
const port: string = process.env.PORT;
const secret: string = process.env.SESSION_SECRET;
const expiry: number = 1000 * 60 * 60 * 24 * 7;

const sessionMiddleware = session({
  name: "session_name",
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: expiry,
  },
});

app.set("trust proxy", 1);
app.use(sessionMiddleware);

app.use(express.json());
app.use(userRouter);

app.get("/protected", verifySession, async (req: Request, res: Response) => {
  res.send("Hello from protected");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ message: "Bad route" });
});

app.listen(port, () => {
  console.info(`Server is running on port: ${port}`);
});
