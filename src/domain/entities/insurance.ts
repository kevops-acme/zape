export class Insurance {

    constructor(private insurance: InsuranceType) {}

    get holderId() {
        return this.insurance.holderId;
    }

    get holderName() {
        return this.insurance.holderName;
    }

    get type() {
        return this.insurance.type;
    }

    get amount() {
        return this.insurance.amount;
    }

}

export type InsuranceType = {
    holderId: string,
    holderName: string,
    type: string,
    amount: string
}