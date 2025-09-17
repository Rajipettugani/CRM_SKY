import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://rajeswaripettugani:Raji1103@cluster0.c6xaff9.mongodb.net/sky_crm?retryWrites=true&w=majority&appName=Cluster0';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: undefined });
  console.log('MongoDB connected');
  // console.log('MongoDB URI:', uri);
  // console.log('Mongoose DB Name:', mongoose.connection.name);
};

export default connectDB;
