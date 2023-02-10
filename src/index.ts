import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./components/user/user.routes.js";
import session from "express-session";
dotenv.config();

const app = express();
const port: string = process.env.PORT;
const secret: string = process.env.SESSION_SECRET;
const expiry: number = 1000 * 60 * 60 * 24 * 7;

const sessionMiddleware = session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: expiry
  }
})

app.set('trust proxy', 1)
app.use(sessionMiddleware)

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.use(express.json())
app.use(userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({message: "Bad route"})
})

app.listen(port, () => {
  console.info(`Server is running on port: ${port}`);
});
