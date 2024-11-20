import { PurchaseStatus } from "../../common/enums/PurchasesStatus.enum";
import { BaseEntity } from "../../common/config/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PaymentMethodEntity } from "../../payment/entities/payment-method.entity";


@Entity('purchase')
export class PurchaseEntity extends BaseEntity{

    @Column({type: "varchar"})
    status: PurchaseStatus 

    @ManyToOne(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.purchase)
    @JoinColumn({name: "payment_method_id"})
    paymentMethod: string;
}
