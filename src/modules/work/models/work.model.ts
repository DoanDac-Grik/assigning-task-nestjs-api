import { Schema, Document } from 'mongoose';
import { User } from '../../user/models/user.model';
import { Task } from './task.model';

const WorkSchema = new Schema(
  {
    title: String,
    description: String,
    status: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: 'works',
  },
);

export { WorkSchema };

export class WorkModel extends Document {
  title: string;
  description: string;
  status: string;
  tasks: [Task];
  creator: User;
}

export interface Work {
  title: string;
  description: string;
  status: string;
  tasks: [Task];
  creator: User;
}
