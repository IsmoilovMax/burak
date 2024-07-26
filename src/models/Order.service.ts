import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import Errors, { Message } from "../libs/utils/Errors";
import { HttpCode } from "../libs/utils/Errors";
import { ObjectId } from "mongoose";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enums/order.enum";


class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly memberService;

    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
        this.memberService = new MemberService();
    }

    public async createOrder(member: Member, input: OrderItemInput[])
    : Promise<Order>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        const amout = input.
            reduce((accumulator: number, item: OrderItemInput) => {
                return accumulator + item.itemPrice * item.itemQuantity;
            }, 0);
        const delivery = amout < 100 ? 5 : 0;
        console.log("values", amout, delivery);

        try {
            const newOrder: Order | any = await this.orderModel
                .create({
                    orderTotal: amout + delivery,
                    orderDelivery: delivery,
                    memberId: memberId,
                });

                const orderId = newOrder._id;
                console.log("orderId:", newOrder._id);
                await this.recordOrderItem(orderId, input);
            return newOrder;
        } catch(err) {
            console.log("Error, model:createOrder:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }

    }

    private async recordOrderItem(orderId: ObjectId, input: OrderItemInput[])
    : Promise<void> {
        const promisedList = input.map(async (item: OrderItemInput) => {
            item.orderId = orderId;
            item.productId = shapeIntoMongooseObjectId(item.productId);
            await this.orderItemModel.create(item);
            return "OKEY";
        });

        console.log("promisedList:", promisedList);
        const orderItemState = await Promise.all(promisedList);
        console.log("orderItemState:", orderItemState);
    }

    public async getMyOrders(member: Member, inquiry: OrderInquiry)
    :Promise<Order[]> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const matches = {
            memberId: memberId,
            orderStatus: inquiry.orderStatus
        };

        const result = await this.orderModel.aggregate([
            {$match: matches},
            {$sort: {updatedAt: -1}},
            {$skip: (inquiry.page - 1) * inquiry.limit},
            {$limit: inquiry.limit },
            {
                $lookup: {
                    from: "orderItems",
                    localField: "_id",
                    foreignField: "orderId",
                    as : "orderItems",
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "orderItems.productId",
                    foreignField: "_id",
                    as: "productData"
                }
            }
        ]).exec();
        if(!result) 
            throw new Errors(HttpCode.NOT_FOUND, Message.NICK_NOT_FOUND);
        return result;
    }

    public async updateOrder(member: Member, input: OrderUpdateInput)
    : Promise<Order | any> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const orderId = shapeIntoMongooseObjectId(input.orderId)
        const orderStatus = input.orderStatus;

        const result = await this.orderModel
            .findByIdAndUpdate(
                {
                    memberId: memberId,
                    _id: orderId,
                },
                { orderStatus: orderStatus},
                { new: true}
            ).exec();

            if(!result)
                throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

            if(orderStatus === OrderStatus.PROCESS) {
                await this.memberService.addUserPoint(member, 1);
            }

            return result;

    }

    
 }

export default OrderService