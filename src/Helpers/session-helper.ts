import { Request, Response, NextFunction } from "express";
import session from 'express-session';

const secret:any = process.env.secret;

const sessionObj = session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 600000,
    },
})

// function sessionImplementation(req:Request, res:Response, next:NextFunction){

// }

export default sessionObj;