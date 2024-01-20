import mongoose from 'mongoose';

const connection: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`
const client = mongoose.connect(connection);
module.exports = client;