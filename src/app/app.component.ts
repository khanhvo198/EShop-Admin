import { provideHttpClient } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [RouterModule],
})
export class AppComponent {
  public static bootstrap() {
    bootstrapApplication(this, {
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(),
        provideRouter(routes),
      ],
    }).catch((err) => console.error(err));
  }
}
