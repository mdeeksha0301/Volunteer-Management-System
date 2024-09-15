"use strict";
// import { Schema, model, models, Document } from 'mongoose';
Object.defineProperty(exports, "__esModule", { value: true });
// interface IDonation extends Document {
//   user: Schema.Types.ObjectId;
//   itemTypes: { itemType: string; quantity: number }[];
//   description?: string;
//   category?: 'male' | 'female' | 'children';
//   ageRange?: '0-5' | '6-10' | '11-15' | '16-20';
//   pickupTime: Date;
// }
// const donationSchema = new Schema<IDonation>({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   itemTypes: [{ itemType: { type: String, required: true }, quantity: { type: Number, required: true } }],
//   description: { type: String, required: true },
//   category: { type: String, enum: ['male', 'female', 'children'], required: true },
//   ageRange: { type: String, enum: ['0-5', '6-10', '11-15', '16-20'], required: true },
//   pickupTime: { type: Date, required: true }
// });
// const Donation = models.Donation || model<IDonation>('Donation', donationSchema);
// export default Donation;
// export { IDonation };
const mongoose_1 = require("mongoose");
// Custom validation function
const validateItemType = (itemTypes) => {
    return itemTypes.every((item) => {
        if (item.itemType === 'clothes' && !item.category) {
            return false;
        }
        if (item.category === 'children' && !item.ageRange) {
            return false;
        }
        return true;
    });
};
const donationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    itemTypes: [{
            itemType: { type: String, required: true },
            quantity: { type: Number, required: true },
            category: { type: String, enum: ['male', 'female', 'children'] },
            ageRange: { type: String, enum: ['0-5', '6-10', '11-15', '16-20'] },
        }],
    description: { type: String },
    pickupTime: { type: Date, required: true }
});
// Add custom validation to the schema
donationSchema.pre('save', function (next) {
    if (!validateItemType(this.itemTypes)) {
        return next(new Error('Invalid item types or missing required fields.'));
    }
    next();
});
const Donation = mongoose_1.models.Donation || (0, mongoose_1.model)('Donation', donationSchema);
exports.default = Donation;
