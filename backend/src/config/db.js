import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    const options = {
        maxPoolsize: 20,
        minPoolsize: 3,

        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,

        family: 4,
        autoIndex: process.env.NODE_ENV !== 'production'
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDb Connection Failed', error.message);
    process.exit(1);
  }
};

export default connectDB;
