import { Product, ProductInput, ProductInQuery, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";






class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;

    }

    /** SPA */

    public async getProducts(inquiry: ProductInQuery): Promise<Product[]> {
         const match: T = { productStatus: ProductStatus.PROCESS };
        console.log("inquiry:", inquiry)
        if(inquiry.productCollection) 
            match.productCollection = inquiry.productCollection;

        if(inquiry.search) {
            match.productName = {$regex: new RegExp(inquiry.search, "i")};
        }
        console.log("match:", match)
        const sort: T = 
            inquiry.order === "productPrice" 
            ? { [inquiry.order]:  1 }
            : { [inquiry.order]: -1 };

        console.log("sort:", sort)
        const result = await  this.productModel.aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: (inquiry.page - 1) * inquiry.limit },
            { $limit: inquiry.limit },
        ])
        .exec();
        console.log("result-agreggate:", result);
        if(!result) 
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        
         console.log("product-1:", result)   
        return result;
    }

    /**SSR */

    public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel
            .find()
            .exec();
        if(!result )
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        console.log("result:", result);
        return result as [];
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input)  as any ;
        } catch (err) {
            console.error("Error, model: createNewProduct:", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
        

    }

    public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product | any>  {
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
            .findOneAndUpdate({ _id: id}, input, {new: true})
            .exec();
        if(!result )
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        console.log("result:", result);
        return result;
    }

}

export default ProductService;