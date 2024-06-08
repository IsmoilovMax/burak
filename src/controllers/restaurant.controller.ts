import express, {Request, Response}  from "express";
import {T} from "../libs/types/common";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
   try {
    console.log("goHome");
        res.send("You are on Home page");
   } catch (err) {
        console.log("Error, goHome:", err)
   }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");    
        res.send("Login page");
    } catch (err) {
         console.log("Error, getLogin:", err)
    }
 }

 restaurantController.getSignup = (req: Request, res: Response) => {
    try {
    console.log("getSignup");     
        res.send("Signup page");
    } catch (err) {
        console.log("Error, getSignup:", err)
    }
 }

export default restaurantController;