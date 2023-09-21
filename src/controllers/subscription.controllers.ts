import { Request, Response } from "express";
import {
  changeSubscriptionStatus,
  checkSubscriptionExist,
  createSubscription,
  removeSubscription,
} from "../services/subscription.services";
import { ISubscriptionWebsocket } from "../interfaces/subscription.interfaces";
import {
  checkUserExist,
  modifyUserSubscription,
} from "../services/user.services";
import { Schema } from "mongoose";

export const subscriptionActivated = async (
  req: Request<{}, {}, ISubscriptionWebsocket>,
  res: Response
) => {
  try {
    //Check if user exists
    if (!(await checkUserExist(req.body.attributes.user_email))) {
      throw Error("User not exists");
    }
    if (!(await checkSubscriptionExist(req.body.id))) {
      //Create subscription because it is not existing
      const subscriptionId = await createSubscription({
        providerId: req.body.id,
        subscriptionStatus: "active",
        createdAt: req.body.attributes.created_at || new Date(),
        updatedAt: req.body.attributes.updated_at || undefined,
        endsAt: req.body.attributes.ends_at || undefined,
      });

      //Add subscription to user
      await modifyUserSubscription(
        subscriptionId as any as Schema.Types.ObjectId, //Fix in future
        req.body.attributes.user_email
      );
    } else {
      await changeSubscriptionStatus({
        providerId: req.body.id,
        subscriptionStatus: "active",
        createdAt: req.body.attributes.created_at || new Date(),
        updatedAt: req.body.attributes.updated_at || undefined,
        endsAt: req.body.attributes.ends_at || undefined,
      });
    }
    return res.status(200).json({
      message: "Subscription Succesfully Activated",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const subscriptionCancelled = async (
  req: Request<{}, {}, ISubscriptionWebsocket>,
  res: Response
) => {
  try {
    if (!(await checkSubscriptionExist(req.body.id))) {
      throw Error("Subscription not exists");
    }
    await removeSubscription(req.body.id);
    if (!(await checkUserExist(req.body.attributes.user_email))) {
      throw Error("User not exists");
    }
    await modifyUserSubscription(undefined, req.body.attributes.user_email);

    return res.status(200).json({
      message: "Subscription Succesfully Cancelled",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const subscriptionInactivated = async (
  req: Request<{}, {}, ISubscriptionWebsocket>,
  res: Response
) => {
  try {
    if (!(await checkSubscriptionExist(req.body.id))) {
      throw Error("Subscription not exists");
    }
    await changeSubscriptionStatus({
      providerId: req.body.id,
      subscriptionStatus: "unactive",
      createdAt: req.body.attributes.created_at || new Date(),
      updatedAt: req.body.attributes.updated_at || undefined,
      endsAt: req.body.attributes.ends_at || undefined,
    });
    if (!(await checkUserExist(req.body.attributes.user_email))) {
      throw Error("User not exists");
    }
    return res.status(200).json({
      message: "Subscription Succesfully Inactivated",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
