import mongoose, { Schema, Document } from "mongoose";

enum UserRole {
  VIEWER = "VIEWER",
  CREATOR = "CREATOR",
  VIEWALL = "VIEWALL",
}

export interface IUser extends Document {
  email: string;
  password: string;
  roles: UserRole[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [
      {
        type: String,
        enum: Object.values(UserRole),
      },
    ],
    default: [UserRole.VIEWER],
    validate: {
      validator: function (roles: UserRole[]) {
        return roles.every((role: UserRole) =>
          Object.values(UserRole).includes(role)
        );
      },
      message: "Invalid role provided",
    },
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
