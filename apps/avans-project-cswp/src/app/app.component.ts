import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { NxWelcomeComponent } from './nx-welcome.component';
// import { HeaderComponent } from '@avans-project-cswp-header/'
import { FeaturesModule } from '@avans-project-cswp/frontend/features';
 import { UiModule } from '@avans-project-cswp/ui';

@Component({
  standalone: true,
  imports: [ RouterModule, FeaturesModule, UiModule],
  selector: 'avans-project-cswp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'avans-project-cswp';
}
