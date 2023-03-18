import { Schema, Document } from 'mongoose';
import { User } from '../../user/models/user.model';

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    document_link: String,
    stage: String,
    workId: String,
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    collection: 'tasks',
  },
);

export { TaskSchema };

export class TaskModel extends Document {
  title: string;
  description: string;
  workId: string;
  reviewer: User;
  assignee: User;
  creator: User;
  stage: string;
  document_link: string;
}

export interface Task {
  title: string;
  description: string;
  workId: string;
  reviewer: User;
  assignee: User;
  creator: User;
  stage: string;
  document_link: string;
}
