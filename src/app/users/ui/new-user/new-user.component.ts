import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../../shared/ui/user-form/user-form.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  template: ` <app-user-form></app-user-form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UserFormComponent],
})
export default class NewUserComponent {}
