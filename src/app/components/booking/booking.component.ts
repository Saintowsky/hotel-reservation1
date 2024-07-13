import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [CommonModule]
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

  calculateTotalPrice(booking: any): number {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    return nights * booking.room.price;
  }
}