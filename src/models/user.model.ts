import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interfaces";

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "Subscription",
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error | undefined, salt: string) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: (err: Error | null | undefined, isMatch: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err, false);
    cb(null, isMatch);
  });
};

export default mongoose.model<IUser>("User", UserSchema);
