import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeaturesModule } from '@avans-project-cswp/frontend/features';
import { UiModule } from '@avans-project-cswp/ui';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  imports: [RouterModule, FeaturesModule, UiModule],
  selector: 'avans-project-cswp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
