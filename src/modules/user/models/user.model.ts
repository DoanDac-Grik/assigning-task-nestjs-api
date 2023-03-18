import { OmitType } from '@nestjs/swagger';
import { Document, Schema } from 'mongoose';
import { Factory } from 'nestjs-seeder';

const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    refreshToken: String,
    twoFactorAuthenticationSecret: String,
    isTwoFactorAuthenticationEnabled: { type: Boolean, default: false },
    roles: Array<string>,
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

export class UserModel extends Document {
  @Factory((_faker, ctx) => ctx.email)
  email: string;
  @Factory((_faker, ctx) => ctx.name)
  name: string;
  @Factory((_faker, ctx) => ctx.password)
  password: string;
  refreshToken: string;
  twoFactorAuthenticationSecret: string;
  isTwoFactorAuthenticationEnabled: boolean;
  @Factory((_faker, ctx) => ctx.roles)
  roles: string[];
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  refreshToken: string;
  twoFactorAuthenticationSecret: string;
  isTwoFactorAuthenticationEnabled: boolean;
  roles: string[];
}

// export type UserInfo = Omit<User, 'password'>;
export interface UserTokenInfo {
  email: string;
  expiresIn: string;
  accessToken: string;
  refreshToken?: string;
  expiresInRefresh?: string;
}
