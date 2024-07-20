import {NextFunction, Request, Response}  from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import AuthService from "../models/Auth.service";
import {AUTH_TIMER} from "../libs/types/config"
import {ExtendedRequest} from "../libs/types/member"

const memberService = new MemberService();
const authService = new AuthService
const memberController: T = {};


memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: MemberInput = req.body, 
            result: Member = await memberService.signup(input);
        //TODO:TOKENS  AUTHENTICATION
        const token = await authService.createToken(result);
        console.log("token:", token)
        
        res.cookie
         (
             "accessToken", token, 
             {maxAge: AUTH_TIMER *3600*1000,
             httpOnly:false,    
        })
         //TODO:TOKENS AUTHENTICATION
 
         return res.status(HttpCode.CREATED).json({member: result, accessToken: token}); 
         

    } catch (err) {
        console.log("Error, signup:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        
        
    }
    
};

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body, 
            result = await memberService.login(input),
            token = await authService.createToken(result);

        res.cookie
        (
            "accessToken", token, 
            {maxAge: AUTH_TIMER *3600*1000,
            httpOnly:false,    
       })
        //TODO:TOKENS AUTHENTICATION

        return res.status(HttpCode.OK).json({member: result, accessToken: token}); 
        
    } catch (err) {
        console.log("Error, login:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        
    }
};

memberController.logout = (req: ExtendedRequest, res: Response) => {
    try{
        console.log("logout");
        res.cookie("accessToken", null, {maxAge: 0, httpOnly: true});
        res.status(HttpCode.OK).json({logout: true});

    } catch (err) {
        console.log("Error, login:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.getMemberDetail = async(req: ExtendedRequest, res: Response) => {
    try{
        console.log("getMemberDetail");
        const result = await memberService.getMemberDetail(req.member);

        res.status(HttpCode.OK).json(result);

    } catch (err) {
        console.log("Error, getMemberDetail:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.updateMember = async(req: ExtendedRequest, res: Response) => {
    try{
        console.log("updateMember");
        const input: MemberUpdateInput = req.body;
        if(req.file) 
            input.memberImage = req.file.path.replace(/\\/, "/");

        const result = await memberService.updateMember(req.member, input);

        
    res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, updateMember:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.verifyAuth = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["accessToken"];
        if(token) req.member = await authService.checkAuth(token);

        if(!req.member) 
            throw new Errors(HttpCode.UNAUTHORISED, Message.NOT_AUTHENTICATED);

        next(); 
    } catch(err) {
        console.log("Error, verifyAuth:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.retrieveAuth = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["accessToken"];
        if(token) req.member = await authService.checkAuth(token);

        next();
    } catch(err) {
        console.log("Error, retrieveAuth:", err);
        next()
    }
}

export default memberController;