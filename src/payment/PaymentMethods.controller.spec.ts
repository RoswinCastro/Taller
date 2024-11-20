import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsController } from './PaymentMethods.controller';
import { PaymentMethodsService } from './PaymentMethods.service';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [PaymentMethodsService],
    }).compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
