import { Store, StoreConfig } from '@datorama/akita';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

export interface UserState {
  users: User[];
  isBtnDisabled: boolean;
}

const users: User[] = [
  {
    id: 1,
    name: 'Andrija',
    isActive: true,
  },
  {
    id: 2,
    name: 'Marija',
    isActive: true,
  },
  {
    id: 3,
    name: 'Petar',
    isActive: false,
  },
];

export const createInitialState = (): UserState => {
  const allUsersCounter = users.length;
  const activeUsersCounter = users.filter((user) => user.isActive).length;
  return {
    users: users,
    isBtnDisabled:
      allUsersCounter === activeUsersCounter && allUsersCounter < 5
        ? false
        : true,
  };
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
