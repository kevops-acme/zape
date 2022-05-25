import { Inject } from "@nestjs/common";
import { Insurance } from "./../../domain/entities/insurance";
import { InsurancesRepository } from "./../../domain/repositories/insurances.repository";

export class GetInsuranceHolderUseCase {

    constructor(@Inject(InsurancesRepository) private insurancesRepository: InsurancesRepository) {}

    async execute(request: GetInsuranceHolderRequest): Promise<GetInsuranceHolderResponse> {
        const holderId = request.holderId;

        const insurance: Insurance = await this.insurancesRepository.getByHolderId(holderId);

        return {
            insurance
        }

    }

}

export interface GetInsuranceHolderRequest {
    holderId: string;
}

export interface GetInsuranceHolderResponse {
    insurance: Insurance;
}