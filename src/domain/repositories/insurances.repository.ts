import { Insurance } from "../entities/insurance";

export interface InsurancesRepository {

    createInsurance(insurance: Insurance): Promise<string>;

}

export const InsurancesRepository = Symbol('InsurancesRepository');