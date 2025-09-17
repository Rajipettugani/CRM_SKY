import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://rajeswaripettugani:Raji1103@cluster0.c6xaff9.mongodb.net/sky_crm?retryWrites=true&w=majority&appName=Cluster0';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: undefined });
  console.log('MongoDB connected');
<<<<<<< HEAD
=======
  // console.log('MongoDB URI:', uri);
  // console.log('Mongoose DB Name:', mongoose.connection.name);
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
};

export default connectDB;
