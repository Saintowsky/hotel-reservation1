import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private bookingService: BookingService
  ) { }

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
    if (this.room) {
      this.bookingService.createBooking({ roomId: this.room._id }).subscribe(
        () => {
          this.router.navigate(['/booking']);
        },
        error => {
          console.error('Error booking room:', error);
        }
      );
    }
  }
}