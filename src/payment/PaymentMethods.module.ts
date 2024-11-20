import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './PaymentMethods.service';
import { PaymentMethodsController } from './PaymentMethods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './entities/payment-method.entity';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  imports: [
    TypeOrmModule.forFeature([
      PaymentMethodEntity
    ]),
  ]
})
export class PaymentMethodsModule {}
