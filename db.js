import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbURI = `mongodb+srv://root:42NU0HjbhwWsfcmP@cluster0.0q1d6.mongodb.net/erpcell?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(dbURI, { autoIndex: false });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting database ${error}`);
  }
};

export default connectDb;
// 42NU0HjbhwWsfcmP
