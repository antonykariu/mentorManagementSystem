import { NextFunction, Request, Response } from "express";

export function verifySession(req: Request, res: Response, next: NextFunction) {
    console.log(`Session: ${req.session.id}`);
    console.log(req.session)

    if (req.session["user"]) {
        console.log('Found user session')
        next();
    } else {
        console.log("No user session found")
        res.redirect('/login')
    }
}