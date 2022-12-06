import mongoose from "mongoose";
// This is for avoiding mongoose warning in version 6
mongoose.set("strictQuery", false);

const connect = async () => {
  await mongoose.connect(process.env.CONNECTIONS_STRING!);
  console.log("Connected to database");
};

export default connect;
