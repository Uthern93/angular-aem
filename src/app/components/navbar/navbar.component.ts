import { Component, Input  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent{

  @Input() pageTitle: string = '';

  constructor(private router: Router) {}

  signOut() {
    localStorage.removeItem('auth_token');

    this.router.navigate(['/login']);
  }

}
