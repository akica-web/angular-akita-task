import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserQuery } from './state/query';
import { UserStore } from './state/store';
import { User } from './user.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'active'];
  data$ = this.userQuery.getUsersData();

  constructor(
    private userQuery: UserQuery,
    private userStore: UserStore,
    private dialog: MatDialog
  ) {}

  toggleChange(event: MatSlideToggleChange, user: User) {
    this.userStore.update((state) => {
      const userCopy: User = { ...user, isActive: event.checked };
      const stateCopy = structuredClone(state);
      const index = stateCopy.users.findIndex(
        (user) => user.id === userCopy.id
      );
      stateCopy.users[index] = userCopy;
      const allUsersCounter = stateCopy.users.length;
      const activeUsersCounter = stateCopy.users.filter(
        (user) => user.isActive
      ).length;
      stateCopy.isBtnDisabled =
        allUsersCounter === activeUsersCounter && allUsersCounter < 5
          ? false
          : true;
      return stateCopy;
    });
  }

  addUser() {
    this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      hasBackdrop: true,
      disableClose: true,
    });
  }
}
