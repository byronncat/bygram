import mongoose from "mongoose";

const connection: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const db = mongoose
  .connect(connection)
  .then(() => {
    console.log(`[Database]: MongoDB connected`);
  })
  .catch((error) => {
    console.log(`[Database]: MongoDB`, error);
  });

export default {};