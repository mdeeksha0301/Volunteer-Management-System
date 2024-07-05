import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorName: string;
  amount: number;
  donationDate: Date;
}

const DonationSchema: Schema = new Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now },
});

export default mongoose.model<IDonation>('Donation', DonationSchema);
