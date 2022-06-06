import { Request, Response, NextFunction } from "express";
import Tutorial from "../models/tutorial.model";

import mongoose from "mongoose";

async function createTutorial(req:Request, res:Response, next:NextFunction){
    try {
        const {title, description, published} = req.body;
        let params = {title, description, published};
        let errors: string[] = [];
        Object.entries(params).forEach(([key, value]) => {
            if(value === undefined) errors.push(`${key} is required`);
        })
        if(errors.length) return res.status(400).json({ errors });
        const tutorial = await new Tutorial(params).save();
        res.status(201).json({status: "Success", data: tutorial});

    } catch (error:any) {
        console.log(error.message);
        next(error);
    }
}

async function getAllTutorial(req:Request, res:Response, next:NextFunction){
try {
    let selector = {};
    if(req.query.title){
        const {title} = req.query;
        selector = {title};
    } 
    const allTutorials = await Tutorial.find(selector);
    if(!allTutorials.length) return res.status(404).json({message:"No tutorial match found"});
    return res.status(200).json({status:"Success", data: allTutorials});
} catch (error:any) {
    console.log(error.message);
    next(error);
}
}

async function getATutorial(req:Request, res:Response, next:NextFunction){
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message:`request with id ${id} not found`
            });
        }
        const tutorial = await Tutorial.findById({_id:id});
        return res.status(200).json({status:"Success", data:tutorial})
    } catch (error:any) {
        console.log(error.message);
        next(error);
    }
    
}

// async function getATutorialByTitle(req:Request, res:Response, next:NextFunction){
//     const {title} = req.query;
//     try {
//         const tutorial = await Tutorial.findOne({title});
//         return res.status(200).json({status:"Success", data:tutorial})
//     } catch (error:any) {
//         console.log(error.message);
//         next(error);
//     }
    
// }

async function updateATutorial(req:Request, res:Response, next:NextFunction){
    try {
        const id = req.params.id;
        const {title, description, published} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message:`request with id ${id} not found`
            });
        }

        const tutorial = await Tutorial.findById({_id:id});
        tutorial.title = title || tutorial.title;
        tutorial.description = description || tutorial.description;
        if(published !== undefined) tutorial.published = published;
        
        const result = await tutorial.save();
        res.status(200).json({Status:"Success", data:result});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function removeATutorial(req:Request, res:Response, next:NextFunction){
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message:`request with id ${id} not found`
            });
        }

        const tutorial = await Tutorial.findByIdAndDelete({_id:id});
        if(!tutorial) return res.status(404).json({message: `Tutorial with id ${id} not found`});
        return res.status(200).json({status: "Success", message: "Tutorial deleted successfully"});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};

async function removeAllTutorials(req:Request, res:Response, next:NextFunction){
    try {
        await Tutorial.deleteMany({});
        res.status(404).json({message: "No tutorial is available in the database"});
        return res.status(200).json({status: "Success", message: "All Tutorials deleted successfully"});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};



export { createTutorial, getAllTutorial, getATutorial,
     updateATutorial, removeATutorial, removeAllTutorials };