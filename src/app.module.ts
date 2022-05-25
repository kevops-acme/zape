import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddInsuranceUseCase } from './application/insurances/add-insurance.usecase';
import { InsuranceMongo, InsuranceSchema } from './infrastructure/persistence/insurance.schema';
import { InsuranceController } from './infrastructure/rest/insurance.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsurancesRepository } from './domain/repositories/insurances.repository';
import { InsurancesMongoAdapter } from './infrastructure/persistence/insurances.mongo.adapter';
import { GetInsuranceHolderUseCase } from './application/insurances/get-insurance-holder.usecase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      auth: { username: process.env.MONGO_USER, password: process.env.MONGO_PASS},
      authSource: process.env.MONGO_AUTH_SOURCE
    }),
    MongooseModule.forFeature([{name: InsuranceMongo.name, schema: InsuranceSchema}])
  ],
  controllers: [AppController, InsuranceController],
  providers: [AppService, AddInsuranceUseCase, GetInsuranceHolderUseCase, {
    provide: InsurancesRepository, useClass: InsurancesMongoAdapter
  }],
})
export class AppModule {}
