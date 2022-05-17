
import { Insurance } from "./../../domain/entities/insurance";
import { InsurancesRepository } from "../../domain/repositories/insurances.repository";
import {v4 as uuidv4} from 'uuid';
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InsuranceDocument, InsuranceMongo } from "src/infrastructure/persistence/insurance.schema";
import { Model } from "mongoose";

@Injectable()
export class InsurancesMongoAdapter implements InsurancesRepository {

    constructor(@InjectModel(InsuranceMongo.name) private insuranceModel: Model<InsuranceDocument>) {}

    async createInsurance(insurance: Insurance): Promise<string> {
        const createdInsurance = new this.insuranceModel(insurance);
        const result = await createdInsurance.save();
        return '' + result._id;

    }

}