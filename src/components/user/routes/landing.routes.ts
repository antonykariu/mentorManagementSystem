import { Router, Request, Response } from "express";

const Landing = Router();

Landing.get("/", (req: Request, res: Response) => {
  res.send("Default landing page route");
});

export default Landing;
