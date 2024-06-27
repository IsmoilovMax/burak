import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs//types/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/types/config";

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
		//throw new Errors(HttpCode.BAD_REQUEST , Message.NO_DATA_FOUND)
		
		throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK)
			
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
		throw new Errors(HttpCode.NOT_FOUND, Message.NICK_NOT_FOUND)
	}

	const isMatch = await bcrypt.compare(
		input.memberPassword,
		member.memberPassword
	)
	if (!isMatch) 
		throw new Errors(HttpCode.UNAUTHORISED, Message.NOT_AUTHENTICATED)

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
        throw new Errors(HttpCode.UNAUTHORISED, Message.WRONG_PASSWORD);
    } 
          

    return  (await this.memberModel.findById(member._id).exec()) as Member;
}

	public async getUsers(): Promise<Member []> {
	const result = await this.memberModel.find({ memberType: MemberType.USER })
	.exec();

	if(!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
	
		return result as [];
	}

	public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
		input._id = shapeIntoMongooseObjectId(input._id);
		const result = await this.memberModel.findByIdAndUpdate({ _id: input._id }, input, {new: true})
		.exec();
	
		if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
		
			return result as Member;
	}
	
}

export default MemberService;