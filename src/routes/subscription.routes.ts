import express from "express";
import {
  subscriptionActivated,
  subscriptionCancelled,
  subscriptionInactivated,
} from "../controllers/subscription.controllers";

const router = express.Router();

//Declaring routes for payment provider webhooks

router.post("/subsceibtion-activated", (req, res) => {
  req.body = JSON.parse(req.body.toString());
  subscriptionActivated(req, res);
});

router.post("/subsceibtion-cancelled", (req, res) => {
  req.body = JSON.parse(req.body.toString());
  subscriptionCancelled(req, res);
});

router.post("/subsceibtion-inactivated", (req, res) => {
  req.body = JSON.parse(req.body.toString());
  subscriptionInactivated(req, res);
});

export default router;
