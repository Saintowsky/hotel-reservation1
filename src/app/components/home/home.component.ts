import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `
    <h1>Welcome to Hotel Reservation</h1>
    <p>Book your perfect stay with us!</p>
  `
})
export class HomeComponent { }