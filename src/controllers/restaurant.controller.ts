import express, {NextFunction, Request, Response}  from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs//types/Errors";



const memberService = new MemberService(); 

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
   try {
        console.log("goHome");
        res.render("home");
       
        //send Этот метод отправляет текстовое или HTML содержимое в ответ на запрос. 
        //json  Этот метод отправляет JSON объект в ответ на запрос. 
        //redirect Этот метод перенаправляет клиента на указанный URL. 
        //end  Этот метод завершает процесс ответа и отправляет его клиенту.
        //render  Этот метод используется для рендеринга HTML-шаблонов с использованием шаблонизатора (например, EJS).
   } catch (err) {
        console.log("Error, goHome:", err);
        res.redirect("/admin");
   }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");     
        res.render("signup");
    } catch (err) {
        console.log("Error, getSignup:", err);
        res.redirect("/admin");
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");    
        res.render("login");
    } catch (err) {
         console.log("Error, getLogin:", err);
         res.redirect("/admin");
    }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup");
         
        const newMember: MemberInput = req.body; 
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember);
       

        req.session.member = result; // cookie ni ichiga sid? ni joylab keladi va memberdata (result) di saqlab  keladi
        req.session.save(function () {
            res.send(result);
        });

    } catch (err) {
        console.log("Error, ProcessSignup:", err);
        const message = 
            err instanceof Errors ? err.message: Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
        );
    }
    
};

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
       
        const input: LoginInput = req.body; 
        const result = await memberService.processLogin(input);
        
        req.session.member = result;
        req.session.save(function () {
            res.send(result);
        });
    
    } catch (err) {
        console.log("Error, processLogin:", err);
        const message = 
            err instanceof Errors ? err.message: Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/login') </script>`
        );
    }

};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function () {
            res.redirect("/admin");
        });
        
    } catch (err) {
        console.log("Error, logout:", err);
            res.redirect("/admin");
    }

};

restaurantController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log("checkAuthSession");
       if (req.session?.member) 
        res.send(`<script> alert("${req.session.member.memberNick}")</script> `);
       else 
        res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
    
};

restaurantController.verifyRestaurant = (
    req: AdminRequest, 
    res: Response, 
    next: NextFunction
) =>{
    
      if(req.session?.member?.memberType === MemberType.RESTAURANT) {
        req.member = req.session.member;
        next();
      } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
        );
      }
}


export default restaurantController;