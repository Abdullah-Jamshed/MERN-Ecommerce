import mongoose from "mongoose";
import bycrypt from "bcryptjs";

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
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

// // hash password middleware
// // @ desc this middleware run before creating user with create method

// userSchema.pre("save", async function (next) {
//   if (!isModified("password")) next(); // // if password is not modified then not hash it
//   const salt = await bycrypt.genSalt(10);
//   this.password = await bycrypt.hash(this.password, salt);
// });

const User = mongoose.model("user", userSchema);

export default User;
