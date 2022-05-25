import { Insurance } from "../entities/insurance";

export interface InsurancesRepository {

    createInsurance(insurance: Insurance): Promise<string>;
    getByHolderId(holderId: string): Promise<Insurance>;

}

export const InsurancesRepository = Symbol('InsurancesRepository');