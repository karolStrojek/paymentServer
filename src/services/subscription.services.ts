import { ISubscription } from "../interfaces/subscription.interfaces";
import Subscription from "../models/subscription.model";

export const createSubscription = async (subscription: ISubscription) => {
  try {
    const newSubscription = new Subscription(subscription);
    const created = await newSubscription.save();
    return created._id;
  } catch (e) {
    throw Error("Error Cannot create subscription");
  }
};

export const checkSubscriptionExist = async (providerId: string) => {
  try {
    const subscription = await Subscription.findOne({ providerId: providerId });
    if (subscription) {
      return true;
    }
    return false;
  } catch (e) {
    throw Error("Error Cannot check if subscription exists");
  }
};

export const changeSubscriptionStatus = async (subscription: ISubscription) => {
  try {
    const subscriptionModified = await Subscription.findOneAndUpdate(
      { providerId: subscription.providerId },
      subscription
    );
    return subscriptionModified;
  } catch (e) {
    throw Error("Error Cannot Modify subscription");
  }
};

export const removeSubscription = async (providerId: string) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      providerId: providerId,
    });
    return subscription?._id;
  } catch (e) {
    throw Error("Error Cannot remove subscription");
  }
};
