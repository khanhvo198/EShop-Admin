import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>users works!</p> `,
  styleUrls: ['./users.component.scss'],
})
export default class UsersComponent {}
