const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  },
  bio: String,
  phoneNumber: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
