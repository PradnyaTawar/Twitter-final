const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "Hello people, I am new on Twitter. Let's Connect!!!",
  },
  backgroundwallpaper: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1613062975324-f95b97f29233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  profileImg: {
    type: String,
    default:
      "https://i.pinimg.com/474x/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855--milk-tart-entertaiment-news.jpg",
  },
  followers: [
    {
      type: ObjectId,
      ref: "UserModel",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "UserModel",
    },
  ],
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
