import { Insurance, InsuranceType } from "./../../domain/entities/insurance";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InsuranceDocument, InsuranceMongo } from "./../../infrastructure/persistence/insurance.schema";
import { Model } from "mongoose";

@Injectable()
export class AddInsuranceUseCase {

    constructor(@InjectModel(InsuranceMongo.name) private insuranceModel: Model<InsuranceDocument>) {}

    async execute(request: AddInsuranceRequest): Promise<AddInsuranceResponse> {
        
        const insurance: InsuranceType = {
            amount: request.amount,
            holderId: request.holderId,
            holderName: request.holderName,
            type: request.type
        }
        console.log(insurance);
        const createdInsurance = new this.insuranceModel(insurance);
        const result = await createdInsurance.save();
        const insuranceId = result._id;

        return {
            insuranceCode: insuranceId
        }
    }

}

export type AddInsuranceRequest = {
    holderId: string,
    holderName: string,
    type: string,
    amount: string
}

export type AddInsuranceResponse = {
    insuranceCode: string
}