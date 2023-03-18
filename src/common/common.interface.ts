import { Request } from 'express';
import { User } from '../modules/user/models/user.model';

//Pagination Response
export interface IPaginationResponse<T> {
  count: number;
  total_page: number;
  data: T;
}

//Request with User
export interface RequestWithUser extends Request {
  user: User;
}

export interface SucessResponse<T> {
  statusCode: number;
  message: string;
  data?: T | Array<T>;
}

export interface FailResponse {
  statusCode: number;
  message: string;
  error?: string;
}
