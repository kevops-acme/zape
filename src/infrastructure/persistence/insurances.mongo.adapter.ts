
import { Insurance } from "./../../domain/entities/insurance";
import { InsurancesRepository } from "../../domain/repositories/insurances.repository";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InsuranceDocument, InsuranceMongo } from "./../../infrastructure/persistence/insurance.schema";
import { Model } from "mongoose";

@Injectable()
export class InsurancesMongoAdapter implements InsurancesRepository {

    private readonly logger = new Logger(InsurancesMongoAdapter.name);

    constructor(@InjectModel(InsuranceMongo.name) private insuranceModel: Model<InsuranceDocument>) {}

    async createInsurance(insurance: Insurance): Promise<string> {
        const createdInsurance = new this.insuranceModel(insurance);
        createdInsurance.holderId = insurance.holderId;
        createdInsurance.holderName = insurance.holderName;
        createdInsurance.type = insurance.type;
        createdInsurance.amount = insurance.amount;
        this.logger.log(createdInsurance);
        const result = await createdInsurance.save();
        return '' + result._id;

    }

    async getByHolderId(holderId: string): Promise<Insurance> {
        const insuranceDocs: InsuranceDocument[] = await this.insuranceModel.find({holderId});
        if (insuranceDocs.length == 0) {
            throw new NotFoundException();
        }
        return new Promise(resolve => {
            const insurance: Insurance = new Insurance({
                amount: insuranceDocs[0].amount,
                holderId: insuranceDocs[0].holderId,
                holderName: insuranceDocs[0].holderName,
                type: insuranceDocs[0].type
            })
            console.log(insurance);
         resolve(insurance);   
        })
        
    }

}