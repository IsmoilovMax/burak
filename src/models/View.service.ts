import { ViewInput, View } from "../libs/types/view";
import Errors, { HttpCode, Message } from "../libs/utils/Errors";
import ViewModel from "../schema/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    public async checkViewExistence(input: ViewInput): Promise<View | any> {
        return await this.viewModel
          .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
          .exec();
      }
    
    public async insertMemberView(input: ViewInput): Promise<View | any> {
        try {
          return await this.viewModel.create(input);
        } catch (err) {
          console.log("ERROR, model:insertMemberView:", err);
          throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
      }
}

export default ViewService;