import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        // console.log('MONGOURL:', process.env.MONGOURL); 
        await connect(process.env.MONGOURL!);
        console.log('MongoDB connected successfully');
    } catch (error) {
        if (error instanceof Error && error.message) {
            console.error('Error connecting to MongoDB:', error.message);
        } else {
            console.error('Unknown error connecting to MongoDB');
        }
    }
};

export default connectDB;
