import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]  // Add ReactiveFormsModule here
})
export class RoomDetailComponent implements OnInit {
  room: any;
  bookingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roomService.getRoom(id).subscribe(
        room => {
          this.room = room;
        },
        error => {
          console.error('Error fetching room details:', error);
        }
      );
    }
  }

  bookRoom(): void {
    if (this.bookingForm.valid && this.room) {
      const booking = {
        room: this.room._id,  // Change roomId to room
        checkInDate: new Date(this.bookingForm.value.checkInDate).toISOString(),
        checkOutDate: new Date(this.bookingForm.value.checkOutDate).toISOString()
      };
      console.log('Booking data being sent:', booking);
      this.bookingService.createBooking(booking).subscribe(
        () => {
          this.router.navigate(['/booking']);
        },
        error => {
          console.error('Error booking room:', error);
          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
        }
      );
    }
  }
}