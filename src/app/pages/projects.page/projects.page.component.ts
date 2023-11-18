import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './projects.page.component.html',
  styleUrl: './projects.page.component.css',
})
export default class ProjectsPageComponent {
  constructor(private router: Router) {}

  navigateTo(input: string) {
    if (this.hasActiveProject) {
      this.router.navigate([input]);
    }
  }

  get hasActiveProject() {
    return localStorage.getItem('keywords') !== null;
  }
}
