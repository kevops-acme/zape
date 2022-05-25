import { Test } from "@nestjs/testing"
import { InsurancesRepository } from "./../../domain/repositories/insurances.repository";
import { AppModule } from "./../../app.module"
import { AddInsuranceRequest, AddInsuranceResponse, AddInsuranceUseCase } from "./../../application/insurances/add-insurance.usecase"

describe('Add insurance', () => {

    let addInsuranceUseCase: AddInsuranceUseCase;
    let insurancesRepository: InsurancesRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        addInsuranceUseCase = moduleRef.get<AddInsuranceUseCase>(AddInsuranceUseCase);
        insurancesRepository = moduleRef.get<InsurancesRepository>(InsurancesRepository);
    })

    it('should execute properly', async () => {

        const insuranceCodeExpected = 'xxxx';
        jest.spyOn(insurancesRepository, 'createInsurance').mockResolvedValue(insuranceCodeExpected);
        
        const request: AddInsuranceRequest = {
            amount: '1100€',
            holderId: '12',
            holderName: 'Ruben',
            type: 'Home'
        }

        const response: AddInsuranceResponse = await addInsuranceUseCase.execute(request);
        expect(response.insuranceCode).toEqual(insuranceCodeExpected);
        
    })

})