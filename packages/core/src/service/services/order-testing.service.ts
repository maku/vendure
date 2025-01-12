import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
    CreateAddressInput,
    TestShippingMethodInput,
    TestShippingMethodResult,
} from '@vendure/common/lib/generated-types';
import { Connection } from 'typeorm';

import { ID } from '../../../../common/lib/shared-types';
import { RequestContext } from '../../api/common/request-context';
import { OrderItem } from '../../entity/order-item/order-item.entity';
import { OrderLine } from '../../entity/order-line/order-line.entity';
import { Order } from '../../entity/order/order.entity';
import { ProductVariant } from '../../entity/product-variant/product-variant.entity';
import { ShippingMethod } from '../../entity/shipping-method/shipping-method.entity';
import { OrderCalculator } from '../helpers/order-calculator/order-calculator';
import { ShippingConfiguration } from '../helpers/shipping-configuration/shipping-configuration';
import { getEntityOrThrow } from '../helpers/utils/get-entity-or-throw';

/**
 * This service is responsible for creating temporary mock Orders against which tests can be run, such as
 * testing a ShippingMethod or Promotion.
 */
@Injectable()
export class OrderTestingService {
    constructor(
        @InjectConnection() private connection: Connection,
        private orderCalculator: OrderCalculator,
        private shippingConfiguration: ShippingConfiguration,
    ) {}

    /**
     * Runs a given ShippingMethod configuration against a mock Order to test for eligibility and resulting
     * price.
     */
    async testShippingMethod(
        ctx: RequestContext,
        input: TestShippingMethodInput,
    ): Promise<TestShippingMethodResult> {
        const shippingMethod = new ShippingMethod({
            checker: this.shippingConfiguration.parseCheckerInput(input.checker),
            calculator: this.shippingConfiguration.parseCalculatorInput(input.calculator),
        });
        const mockOrder = await this.buildMockOrder(ctx, input.shippingAddress, input.lines);
        const eligible = await shippingMethod.test(mockOrder);
        const price = eligible ? await shippingMethod.apply(mockOrder) : undefined;
        return {
            eligible,
            price,
        };
    }
    private async buildMockOrder(
        ctx: RequestContext,
        shippingAddress: CreateAddressInput,
        lines: Array<{ productVariantId: ID; quantity: number }>,
    ): Promise<Order> {
        const mockOrder = new Order({
            lines: [],
        });
        mockOrder.shippingAddress = shippingAddress;
        for (const line of lines) {
            const productVariant = await getEntityOrThrow(
                this.connection,
                ProductVariant,
                line.productVariantId,
                { relations: ['taxCategory'] },
            );
            const orderLine = new OrderLine({
                productVariant,
                items: [],
                taxCategory: productVariant.taxCategory,
            });
            mockOrder.lines.push(orderLine);

            for (let i = 0; i < line.quantity; i++) {
                const orderItem = new OrderItem({
                    unitPrice: productVariant.price,
                    pendingAdjustments: [],
                    unitPriceIncludesTax: productVariant.priceIncludesTax,
                    taxRate: productVariant.priceIncludesTax ? productVariant.taxRateApplied.value : 0,
                });
                orderLine.items.push(orderItem);
            }
        }
        await this.orderCalculator.applyPriceAdjustments(ctx, mockOrder, []);
        return mockOrder;
    }
}
