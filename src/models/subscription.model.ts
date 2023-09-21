import mongoose, { Schema } from "mongoose";
import { ISubscription } from "../interfaces/subscription.interfaces";

const SubscriptionSchema = new mongoose.Schema<ISubscription>({
  providerId: {
    type: String,
    unique: true,
    required: true,
  },
  subscriptionStatus: {
    type: String,
    required: true,
    default: "unactive",
  },
  createdAt: {
    type: Date,
  },
  endsAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
