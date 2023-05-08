import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    SideNavComponent,
    RouterOutlet,
    NgOptimizedImage,
  ],
  template: `
    <div class="layout-container">
      <div class="side-nav">
        <div class="logo">
          <img alt="logo" ngSrc="assets/images/logo.png" fill />
        </div>
        <app-side-nav></app-side-nav>
      </div>
      <div class="side-nav-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
