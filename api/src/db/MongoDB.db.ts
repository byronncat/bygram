import mongoose from 'mongoose';
import { logger } from '@utils';

const connection = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(connection)
  .then(() => {
    logger.success('Database connected', 'MongoDB');
  })
  .catch((error: any) => {
    logger.error(`${error}`, 'MongoDB');
  });

export default {};
