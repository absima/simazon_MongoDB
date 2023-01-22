import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export default () =>
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('connected!'))
    .catch(() => console.log('not connected!'));
