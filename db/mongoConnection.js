import mongoose from 'mongoose';
export default () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('connected!'))
    .catch(() => console.log('not connected!'));
