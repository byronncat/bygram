import mongoose from "mongoose";

const connection: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
const db = mongoose.connect(connection);
db.then(() => {
  console.log(`[Database]: MongoDB connected`);
}).catch((error) => {
  console.log(`[Database]: MongoDB`, error);
});

export default db;
