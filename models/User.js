import { Mongoose } from "mongoose";

const monggose = requir('mongoose');

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    trpe: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);