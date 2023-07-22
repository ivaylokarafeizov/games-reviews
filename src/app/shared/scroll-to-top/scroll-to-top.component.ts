import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-scroll-to-top',
  template: '',
})
export class ScrollToTopComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const body = document.querySelector('body');
        if (body) {
          body.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
