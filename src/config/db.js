import mongoose from "mongoose";

export const uri = process.env.MONGO_URI;

const options = { useUnifiedTopology: true };

export const connectDB = async () => {
  // mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(uri, options);
    console.log("database connection established");
  } catch (err) {
    console.log(err);
  }
};

export const close = async () => {
  await mongoose.connection.close();
};
