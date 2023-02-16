import { Request } from 'express';
import { User } from '../modules/user/models/user.model';

//Pagination Response
export interface IPaginationResponse<T> {
  count: number;
  count_page: number;
  data: T;
}

//Request with User
export interface RequestWithUser extends Request {
  user: User;
}
