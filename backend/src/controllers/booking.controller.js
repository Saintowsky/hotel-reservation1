const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.userId
    });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('room');
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};