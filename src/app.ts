import express from "express";
import config from "./config.json";
import cors from "cors";
import userRouter from "./routes/user.routes";
import subsriptionRouter from "./routes/subscription.routes";
import { checkWebhookSignature } from "./guards/checkWebhookSignature";
import "dotenv/config";
import { createInitUser } from "./utils/createInitUser";
import mongoose from "mongoose";

const app = express();

mongoose.connect(config.database_address);

app.use(cors()); //Default allowing all
app.use(
  "/subscription",
  express.raw({ type: "application/json" }),
  checkWebhookSignature,
  subsriptionRouter
);
/* First make sure that ive got body in Buffer format, 
then check webhook signature. If ok transform body to json 
and send to router*/

app.use("/user", userRouter);

createInitUser();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
