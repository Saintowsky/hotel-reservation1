import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: string | null = null;

  constructor(public authService: AuthService) { }

ngOnInit() {
  this.authService.getCurrentUser().subscribe(user => {
    console.log('Current user updated:', user);
    this.currentUser = user;
  });

  console.log('Is logged in:', this.authService.isLoggedIn());
  console.log('Stored user name:', localStorage.getItem('userName'));
}

logout(): void {
  this.authService.logout();
  console.log('Logged out. Is logged in:', this.authService.isLoggedIn());
}}