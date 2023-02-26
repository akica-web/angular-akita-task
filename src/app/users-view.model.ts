import { User } from './user.model';

export interface UsersViewModel {
  users: User[];
  isBtnDisabled: boolean;
}
