import { Insurance, InsuranceType } from "./../../domain/entities/insurance";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InsuranceDocument, InsuranceMongo } from "./../../infrastructure/persistence/insurance.schema";
import { Model } from "mongoose";
import { InsurancesRepository } from "./../../domain/repositories/insurances.repository";

@Injectable()
export class AddInsuranceUseCase {

    private readonly logger = new Logger(AddInsuranceUseCase.name);

    constructor(@Inject(InsurancesRepository) private insurancesRepository: InsurancesRepository) {}

    async execute(request: AddInsuranceRequest): Promise<AddInsuranceResponse> {

        try {

            const insurance: InsuranceType = {
            amount: request.amount,
            holderId: request.holderId,
            holderName: request.holderName,
            type: request.type
        }
        this.logger.log(insurance);
        const insuranceId = await this.insurancesRepository.createInsurance(new Insurance(insurance));

        return {
            insuranceCode: insuranceId
        }

        }catch(e) {
            this.logger.error(e);
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