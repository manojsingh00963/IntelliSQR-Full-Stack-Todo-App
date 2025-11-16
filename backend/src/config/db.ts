import mongoose from 'mongoose';


const connectDB = async (uri: string) => {
if (!uri) throw new Error('MONGO_URI not provided');
await mongoose.connect(uri, {
// options if needed in older mongoose
} as mongoose.ConnectOptions);
console.log('MongoDB connected');
};


export default connectDB;