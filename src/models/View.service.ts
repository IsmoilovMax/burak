import { ViewInput, View } from "../libs/types/view";
import Errors, { HttpCode, Message } from "../libs/utils/Errors";
import ViewModel from "../schema/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    public async checkViewExistence(input: ViewInput): Promise<View> {
        const watches = await this.viewModel
            .findOne({memberId: input.memberId, viewRefId: input.viewRefId})
            .exec();
        return watches as unknown as View;    
    }

    public async insertMemberView(input: ViewInput): Promise<View> {
        try{
            const result =  await this.viewModel.create(input);
            return result as unknown as View;
        } catch(err) {
            console.log("ERROR, model: insertMemberView:", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }

    }
}

export default ViewService;