import { Schema } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  authenticated: Boolean;
  subscription?: Schema.Types.ObjectId;
}
