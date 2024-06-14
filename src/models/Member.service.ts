import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs//types/Errors";
import { MemberType } from "../libs/enums/member.enum";


class MemberService {
	private readonly memberModel;

	constructor() {
		this.memberModel = MemberModel;
	}

	public async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModel
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec();
		if (exist) throw new Errors(HttpCode.EXIST, Message.USER_EXIST);

		console.log("input.memberPassword (before):", input.memberPassword);

		//const salt = await bcrypt.genSalt();
		//input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

		console.log("input.memberPassword (after):", input.memberPassword);

		try {
			// const tempResult = new this.memberModel(input);
			// const result = await tempResult.save();

			const result = await this.memberModel.create(input);

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
    if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    const isMatch = input.memberPassword === member.memberPassword;
    console.log("isMatch:", isMatch)    

    if (!isMatch) {
        throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    } 
          

    return  (await this.memberModel.findById(member._id).exec()) as Member;
}
	
}

export default MemberService;