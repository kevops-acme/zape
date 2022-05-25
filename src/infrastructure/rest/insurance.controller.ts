import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GetInsuranceHolderRequest, GetInsuranceHolderUseCase } from "./../../application/insurances/get-insurance-holder.usecase";
import { InsuranceDto } from "./../../infrastructure/rest/insurance.dto";
import { AddInsuranceUseCase } from "./../../application/insurances/add-insurance.usecase";
import { InsuranceType } from "./../../domain/entities/insurance";

@Controller('/v1/insurances')
export class InsuranceController {

    constructor(
        private useCase: AddInsuranceUseCase,
        private getInsuranceHolderUseCase: GetInsuranceHolderUseCase
        ) {}

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

    @Get('/:holderId')
    async getInsuranceByHolderId(@Param('holderId') holderId: string): Promise<InsuranceDto> {
        const request: GetInsuranceHolderRequest = {
            holderId
        }
        console.log(holderId);
        const response = await this.getInsuranceHolderUseCase.execute(request);
        return {
            amount: response.insurance.amount,
            holderId: response.insurance.holderId,
            holderName: response.insurance.holderName,
            type: response.insurance.type
        };
    }

}