import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 25,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  address: {
    type: Array,
    default: [],
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  paymentinfo: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model('User', userSchema);
