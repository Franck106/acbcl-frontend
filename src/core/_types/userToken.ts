import { IUserResponse } from './userResponse';

export interface IUserToken {
  token: string;
  user: IUserResponse;
}
