import mongoose from 'mongoose';

/**
 * Connect to MongoDB Database
 * Handles connection errors and provides console feedback
 */
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
