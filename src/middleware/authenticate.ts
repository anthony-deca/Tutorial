import {Request, Response, NextFunction} from 'express';
import {ERequest} from '../Types/request-types'

export default function requireLogin(req:Request, res:Response, next:NextFunction){
try {
    let sess = req.session;
    if(!sess.email) return res.status(401).json({message:"You have to log in to access this route"});
    next();
} catch (error) {
    console.log(error);
    next(error);
}
}