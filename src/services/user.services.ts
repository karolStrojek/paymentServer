import { IUser } from "../interfaces/user.interfaces";
import User from "../models/user.model";
import { Schema } from "mongoose";

export const modifyUserSubscription = async (
  subscriptionId: Schema.Types.ObjectId | undefined,
  userEmail: string
) => {
  try {
    var user = await User.findOne({ email: userEmail });
    if (user) {
      user.subscription = subscriptionId;
    }
    user?.save();
    return user;
  } catch (e) {
    throw Error("Error Cannot modify User Subscription");
  }
};

export const checkUserExist = async (userEmail: string) => {
  try {
    var user = await User.findOne({ email: userEmail });
    if (user) return true;
    return false;
  } catch (e) {
    throw Error("Error Cannot check if User Exist");
  }
};

export const createUser = async (user: IUser) => {
  try {
    const newUser = new User(user);
    const created = newUser.save();
    return created;
  } catch (e) {
    throw Error("Error Cannot create User");
  }
};
