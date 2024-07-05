import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteerOpportunity extends Document {
  organization: Schema.Types.ObjectId | string;
  title: string;
  description: string;
  date: Date;
  country: string;
  city: string;
  location: string;
  image?: string;
  volunteers: Array<Schema.Types.ObjectId | string>;
  // participatedVolunteers: Array<Schema.Types.ObjectId | string>; 
  participatedEvents: Array<Schema.Types.ObjectId | string>;
}

const VolunteerOpportunitySchema: Schema = new Schema({
  // organization: { type: Schema.Types.ObjectId, ref: 'organization' },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true  },
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
    type: String,
    required: [false],
  },
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  // participatedVolunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // New field
  participatedEvents: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Store user IDs who participated
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
export default mongoose.model<IVolunteerOpportunity>(
  'VolunteerOpportunity',
  VolunteerOpportunitySchema
);