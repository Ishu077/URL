import mongoose from "mongoose";
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,  // these 2 used here , even if you donot write ,they will work
      // useUnifiedTopology: true,//  in the earlier version of mongoose they were being used to handle some prbs which are automatically handled in the new version of mongoose ,for more detail refer to gpt!! 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};  //this or the approach used in the bnb project can also be used (in app.js itself!)

export default connectDB;
