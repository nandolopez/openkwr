import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isDarkmodeActive: boolean = false;

  ngOnInit(): void {
    if (!('theme' in localStorage)) {
      if( window.matchMedia('(prefers-color-scheme: dark)').matches){
        localStorage.setItem('theme', 'light');
      }
    } else {
      this.onClickToggleDarkModeButton()
    }
    this.onClickToggleDarkModeButton()
  }

  onClickToggleDarkModeButton(): void {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      this.isDarkmodeActive = false
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      this.isDarkmodeActive = true
    }
  }
}
