const mongoose = require("mongoose");

const model = mongoose.Schema;

const userSchema = new model({
  name: {
    type: String,
    required: true,
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
});

const UserModel = mongoose.model('users',userSchema)
module.exports=UserModel;