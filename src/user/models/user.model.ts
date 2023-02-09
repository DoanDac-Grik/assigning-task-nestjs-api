import { Document, Schema } from 'mongoose';
const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    refreshToken: String,
    twoFactorAuthenticationSecret: String,
    isTwoFactorAuthenticationEnabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
});

export { UserSchema };

export interface User extends Document {
  id: string;
  email: string;
  name: string;
  password: string;
  refreshToken: string;
  twoFactorAuthenticationSecret: string;
  isTwoFactorAuthenticationEnabled: boolean;
}
