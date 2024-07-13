const Room = require('../models/room.model');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ available: true });
    res.send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
};