import mongoose from "mongoose";
import bycrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bycrypt.compare(enteredPassword,this.password)
}


export default User;
