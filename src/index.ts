import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./components/user/user.routes.js";
dotenv.config();

const app = express();
const port: String = process.env.PORT;


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
