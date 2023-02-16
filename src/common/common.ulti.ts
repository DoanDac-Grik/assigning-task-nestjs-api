import { isValidObjectId } from 'mongoose';

export const validateMongoObjectId = (id: string) => {
  return isValidObjectId(id);
};
