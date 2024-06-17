import express, {Request, Response}  from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Member } from "../libs/types/member";


const memberService = new MemberService(); 

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
   try {
        res.send("Home page");
        //send Этот метод отправляет текстовое или HTML содержимое в ответ на запрос. 
        //json  Этот метод отправляет JSON объект в ответ на запрос. 
        //redirect Этот метод перенаправляет клиента на указанный URL. 
        //end  Этот метод завершает процесс ответа и отправляет его клиенту.
        //render  Этот метод используется для рендеринга HTML-шаблонов с использованием шаблонизатора (например, EJS).
   } catch (err) {
        console.log("Error, goHome:", err);
   }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");     
        res.send("Signup page");
    } catch (err) {
        console.log("Error, getSignup:", err);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");    
        res.send("Login page");
    } catch (err) {
         console.log("Error, getLogin:", err);
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");
         
        const newMember: MemberInput = req.body; 
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember);
        //TODO:SESSIONS AUTHENTICATION

        res.send(result); 
    } catch (err) {
        console.log("Error, ProcessSignup:", err);
        res.send(err);
    }
    
};

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin");
       
        const input: LoginInput = req.body; 
        const result = await memberService.processLogin(input);
        //TODO:SESSIONS AUTHENTICATION

        res.send(result);         
    } catch (err) {
        console.log("Error, processLogin:", err);
        res.send(err);
    }
};




export default restaurantController;