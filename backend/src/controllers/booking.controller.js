const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    const booking = new Booking({
      user: req.userId,
      room: req.body.room,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate
    });
    console.log('Created booking object:', booking);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).send({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('room');
    res.send(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).send({ message: error.message });
  }
};