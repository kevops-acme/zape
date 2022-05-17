import { Controller, Post } from "@nestjs/common";
import { AddInsuranceUseCase } from "src/application/insurances/add-insurance.usecase";
import { InsuranceType } from "src/domain/entities/insurance";

@Controller('/v1/insurances')
export class InsuranceController {

    constructor(private useCase: AddInsuranceUseCase) {}

    @Post()
    createInsurance() {
        const addInsuranceRequest: InsuranceType = {
            amount: '1000€',
            holderId: '11',
            holderName: 'Ruben',
            type: 'Home'
        }
        
        return this.useCase.execute(addInsuranceRequest);
    }

}