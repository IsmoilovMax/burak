import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs//types/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
	private readonly memberModel;

	constructor() {
		this.memberModel = MemberModel;
	}


/**SPA */

public async signup(input: MemberInput): Promise<Member> {
	const salt = await bcrypt.genSalt();
	input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

	
	try {
		
		const result = await this.memberModel.create(input)
		result.memberPassword = ""
		return result.toJSON() as Member;
	} catch (err) {
		console.log("Error, model:signup", err)
		throw Error
		
		//throw new Errors(HttpCode.BAD_REQUEST, Message.NICK_NOT_FOUND)
			
	}
}

	public async login(input: LoginInput): Promise<Member> {

	// TODO: Consider memeber status later
	const member = await this.memberModel
		.findOne(
			{ memberNick: input.memberNick },
			{ memberNick: 1, memberPassword: 1 }
		).exec();

	if (!member) {
		throw Error
		//throw new Errors(HttpCode.NOT_FOUND, Message.CREATE_FAILED)
	}

	const isMatch = await bcrypt.compare(
		input.memberPassword,
		member.memberPassword
	)
	if (!isMatch) 
		throw  Error

		return (await this.memberModel.findById(member._id).lean().exec()) as Member

	}


/**SSR */


	public async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModel
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec();

		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

		console.log("input.memberPassword (before):", input.memberPassword);

		const salt = await bcrypt.genSalt();

		input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

		console.log("input.memberPassword (after):", input.memberPassword);

		try {
			// const tempResult = new this.memberModel(input);
			// const result = await tempResult.save();

			const result = await this.memberModel.create(input)
			result.memberPassword = "";
			
			return (result) as Member;
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
        .findOne(
            {memberNick: input.memberNick}, 
            {memberNick: 1, memberPassword:1}
        )
        .exec();  
    if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NICK_NOT_FOUND);
    
	const isMatch = await bcrypt
		.compare(input.memberPassword, member.memberPassword)
	//const isMatch = input.memberPassword === member.memberPassword;
      

    if (!isMatch) {
        throw new Errors(HttpCode.UNAUTHORISED, Message.NOT_AUTHENTICATED);
    } 
          

    return  (await this.memberModel.findById(member._id).exec()) as Member;
}
	
}

export default MemberService;