import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Your Bookings</h2>
    <div *ngFor="let booking of bookings">
      <p>Room: {{ booking.room.name }}</p>
      <p>Check-in: {{ booking.checkInDate | date }}</p>
      <p>Check-out: {{ booking.checkOutDate | date }}</p>
    </div>
  `
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe(
      bookings => {
        this.bookings = bookings;
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}