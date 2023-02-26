import { Query } from '@datorama/akita';
import { UserState, UserStore } from './store';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersViewModel } from '../users-view.model';

@Injectable({
  providedIn: 'root',
})
export class UserQuery extends Query<UserState> {
  constructor(private userStore: UserStore) {
    super(userStore);
  }

  getUsersData(): Observable<UsersViewModel> {
    return this.select([
      (state) => state.users,
      (state) => state.isBtnDisabled,
    ]).pipe(
      map(([users, isBtnDisabled]) => {
        return {
          users,
          isBtnDisabled,
        };
      })
    );
  }
}
