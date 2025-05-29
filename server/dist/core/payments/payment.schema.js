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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSessionSchema = exports.CheckoutSession = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CheckoutSession = class CheckoutSession {
    currentUser;
    plan;
    isYearly;
    extraScans;
    totalScans;
    totalAmount;
    sessionId;
    createdAt;
};
exports.CheckoutSession = CheckoutSession;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CheckoutSession.prototype, "currentUser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CheckoutSession.prototype, "plan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], CheckoutSession.prototype, "isYearly", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CheckoutSession.prototype, "extraScans", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CheckoutSession.prototype, "totalScans", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CheckoutSession.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CheckoutSession.prototype, "sessionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], CheckoutSession.prototype, "createdAt", void 0);
exports.CheckoutSession = CheckoutSession = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CheckoutSession);
exports.CheckoutSessionSchema = mongoose_1.SchemaFactory.createForClass(CheckoutSession);
//# sourceMappingURL=payment.schema.js.map