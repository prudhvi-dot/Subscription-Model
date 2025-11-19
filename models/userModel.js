import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password length must be greater than or equal to 6"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.compare = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = model("User", userSchema);

export default User;
