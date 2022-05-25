import { Body, Controller, Post } from "@nestjs/common";
import { InsuranceDto } from "src/infrastructure/rest/insurance.dto";
import { AddInsuranceUseCase } from "./../../application/insurances/add-insurance.usecase";
import { InsuranceType } from "./../../domain/entities/insurance";

@Controller('/v1/insurances')
export class InsuranceController {

    constructor(private useCase: AddInsuranceUseCase) {}

    @Post()
    createInsurance(@Body() request: InsuranceDto) {
        const addInsuranceRequest: InsuranceType = {
            amount: request.amount,
            holderId: request.holderId,
            holderName: request.holderName,
            type: request.type
        }
        
        return this.useCase.execute(addInsuranceRequest);
    }

}