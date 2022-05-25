import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type InsuranceDocument = InsuranceMongo & Document;

@Schema()
export class InsuranceMongo {

    @Prop()
    holderId: String;

    @Prop()
    holderName: String;

    @Prop()
    type: String;

    @Prop()
    amount: String;

}

export const InsuranceSchema = SchemaFactory.createForClass(InsuranceMongo);