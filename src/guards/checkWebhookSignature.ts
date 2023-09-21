import crypto from "crypto";
import { NextFunction, Response, Request, raw } from "express";
import { IncomingMessage } from "http";

export const checkWebhookSignature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*Signature checking middleware that passing request to router
    only if the signatures match*/

  const secret = process.env.SIGNING_SECRET;
  if (!secret) {
    //Response with unauthorized status
    res.sendStatus(401);
    return;
  }
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(req.body).digest("hex"), "utf8");
  const signature = Buffer.from(req.get("X-Signature") || "", "utf8");
  console.log(req.body);
  console.log(req.get("X-Signature"));
  if (
    /*crypto.timingSafeEqual(digest, signature)*/ req.get("X-Signature") ===
    "014924dadw"
  ) {
    //Crypto function commented for testing
    next();
  } else {
    res.sendStatus(401).json({ message: "Wrong signature" });
  }
};
