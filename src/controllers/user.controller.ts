import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import {verify, hash} from "../Helpers/user-helpers"

async function register(req:Request, res:Response, next:NextFunction){
try {
    const {name, password, email} = req.body;
    const hashedPassword = await hash(password);
    let params = {name, password: hashedPassword, email};
        let errors: string[] = [];
        Object.entries(params).forEach(([key, value]) => {
            if(value === undefined) errors.push(`${key} is required`);
        })
        if(errors.length) return res.status(400).json({ errors });
        const user = await new User(params).save();
        res.status(201).json({status:"Success", data: user});
} catch (error:any) {
    console.log(error.message);
    next(error);
}
}

async function login(req:Request, res:Response, next:NextFunction){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) res.status(404).json({message:`user with email ${email} not found`});
        const isVerified = await verify(password, user.password);
        if(!isVerified) res.status(403).json({message:`enter a valid password`})
        res.status(200).json({status:"Success", data: user});
    } catch (error:any) {
        console.log(error.message);
        next(error);
    }  
}

export {register, login}