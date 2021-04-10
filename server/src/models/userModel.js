import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      name: String,
      require: true,
    },
    email: {
      name: String,
      require: true,
      unique: true,
    },
    password: {
      name: String,
      require: true,
    },
    isAdmin: {
      name: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
