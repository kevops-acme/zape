import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddInsuranceUseCase } from './application/insurances/add-insurance.usecase';
import { InsuranceMongo, InsuranceSchema } from 'src/infrastructure/persistence/insurance.schema';
import { InsuranceController } from './infrastructure/rest/insurance.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  providers: [AppService, AddInsuranceUseCase],
})
export class AppModule {}
