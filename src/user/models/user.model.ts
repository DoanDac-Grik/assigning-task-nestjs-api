import { Exclude } from 'class-transformer';
import { Schema, Document } from 'mongoose';
const UserSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    refreshToken: String,
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
}
