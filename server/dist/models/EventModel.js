"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VolunteerOpportunitySchema = new mongoose_1.Schema({
    // organization: { type: Schema.Types.ObjectId, ref: 'organization' },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    country: {
        type: String,
        required: [true, "Please provide a country name."],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },
    location: {
        type: String,
        required: [true, "Please provide location."],
        // minLength: [20, "Location must contian at least 20 characters!"],
    },
    image: {
        type: [String],
        required: [false],
    },
    type: {
        type: String,
        required: [true, "Please provide a type."],
    },
    volunteers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    // participatedVolunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // New field
    participatedEvents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }], // Store user IDs who participated
});
VolunteerOpportunitySchema.virtual('organizationName', {
    ref: 'users', // Refers to the 'users' model (assuming this is where organizationName is stored)
    localField: 'organization',
    foreignField: '_id',
    justOne: true,
    // Optionally, include 'organizationName' in the schema to avoid TypeScript errors
    // organizationName: { type: String, ref: 'users' }, // Assuming organizationName is a string
});
// export default mongoose.model<IVolunteerOpportunity>('VolunteerOpportunity', VolunteerOpportunitySchema);
exports.default = mongoose_1.default.model('VolunteerOpportunity', VolunteerOpportunitySchema);
