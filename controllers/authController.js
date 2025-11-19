import mongoose from "mongoose";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create(
      [
        {
          name,
          email, // should pass the data in an array when passing session.
          password,
        },
      ],
      { session }
    );

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await user.compare(password);

    if (!isMatch) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 400;
      throw error;
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
