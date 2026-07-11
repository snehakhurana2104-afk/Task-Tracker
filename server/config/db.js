import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });

    console.log("✅ MongoDB Connected");
    console.log(conn.connection.host);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;