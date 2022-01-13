import mongoose from 'mongoose';

const MONGO_URI:any = process.env.MONGO_URI;

const connectDB = () => {
    try {
        mongoose.connect(MONGO_URI);
        console.log("db is now connected");
    } catch (error) {
        throw Error;
    }
    
}
export default connectDB;