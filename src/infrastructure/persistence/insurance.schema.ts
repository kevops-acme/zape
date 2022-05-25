import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type InsuranceDocument = InsuranceMongo & Document;

@Schema()
export class InsuranceMongo {

    @Prop()
    holderId: string;

    @Prop()
    holderName: string;

    @Prop()
    type: string;

    @Prop()
    amount: string;

}

export const InsuranceSchema = SchemaFactory.createForClass(InsuranceMongo);