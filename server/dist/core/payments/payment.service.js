"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stripe_1 = require("stripe");
const payment_schema_1 = require("./payment.schema");
let PaymentsService = class PaymentsService {
    checkoutSessionModel;
    stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-04-30.basil',
    });
    constructor(checkoutSessionModel) {
        this.checkoutSessionModel = checkoutSessionModel;
    }
    async createCheckoutSession(data) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Test Product',
                            },
                            unit_amount: 1000,
                        },
                        quantity: 1,
                    }],
                success_url: 'http://localhost:5173/success',
                cancel_url: 'http://localhost:5173/cancel',
            });
            const checkoutSession = new this.checkoutSessionModel({
                ...data,
                sessionId: session.id,
            });
            await checkoutSession.save();
            return { url: session.url };
        }
        catch (error) {
            console.error('Stripe createCheckoutSession error:', error);
            throw new common_1.InternalServerErrorException('Could not create checkout session');
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.CheckoutSession.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentsService);
//# sourceMappingURL=payment.service.js.map