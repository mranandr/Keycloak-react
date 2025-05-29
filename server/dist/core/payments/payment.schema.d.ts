import { Document } from 'mongoose';
export type CheckoutSessionDocument = CheckoutSession & Document;
export declare class CheckoutSession {
    currentUser: string;
    plan: string;
    isYearly: boolean;
    extraScans: number;
    totalScans: number;
    totalAmount: number;
    sessionId: string;
    createdAt: Date;
}
export declare const CheckoutSessionSchema: import("mongoose").Schema<CheckoutSession, import("mongoose").Model<CheckoutSession, any, any, any, Document<unknown, any, CheckoutSession, any> & CheckoutSession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CheckoutSession, Document<unknown, {}, import("mongoose").FlatRecord<CheckoutSession>, {}> & import("mongoose").FlatRecord<CheckoutSession> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
