import { Request } from 'express';
import { User } from '../user/models/user.model';

//Pagination Response
export interface IPaginationResponse<T> {
  count: number;
  count_page: number;
  data: T;
}

//Request with User
export default interface RequestWithUser extends Request {
  user: User;
}
