const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // cart:{
    //     type:Array,
    //     default:[]
    // },
    // address:{
    //     type: String,
    // },
    // wishlist: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Product',
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
