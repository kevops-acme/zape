import { Test } from "@nestjs/testing"
import { InsurancesRepository } from "../../domain/repositories/insurances.repository";
import { AppModule } from "../../app.module"
import { GetInsuranceHolderRequest, GetInsuranceHolderResponse, GetInsuranceHolderUseCase } from "./../../application/insurances/get-insurance-holder.usecase";
import { Insurance } from "./../../domain/entities/insurance";

describe('Get insurance holder', () => {

    let getInsuranceHolderUseCase: GetInsuranceHolderUseCase;
    let insurancesRepository: InsurancesRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        getInsuranceHolderUseCase = moduleRef.get<GetInsuranceHolderUseCase>(GetInsuranceHolderUseCase);
        insurancesRepository = moduleRef.get<InsurancesRepository>(InsurancesRepository);
    })

    it('should execute properly', async () => {

        const holderId = 'xxxx';
        const insuranceExpected: Insurance = new Insurance({
            amount: '1000€',
            holderId,
            holderName: 'Ruben',
            type: 'Home'
        });
        
        jest.spyOn(insurancesRepository, 'getByHolderId').mockResolvedValue(insuranceExpected);

        const request: GetInsuranceHolderRequest = {
            holderId
        }
        const response: GetInsuranceHolderResponse = await getInsuranceHolderUseCase.execute(request);
        expect(response.insurance).toEqual(insuranceExpected);
        
    })

})