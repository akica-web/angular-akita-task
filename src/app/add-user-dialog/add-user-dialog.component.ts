import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserStore } from '../state/store';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogComponent {
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    isActive: [false],
  });

  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
    private dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.userStore.update((state) => {
      const stateCopy = structuredClone(state);
      const newUser: User = {
        id: stateCopy.users.length + 1,
        name: this.form.getRawValue().name,
        isActive: this.form.getRawValue().isActive,
      };
      stateCopy.users.push(newUser);
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
    this.dialogRef.close();
  }
}
