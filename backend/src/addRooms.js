const mongoose = require('mongoose');
const path = require('path');
const Room = require('./models/room.model.js');
const config = require('./config');

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleRooms = [
  {
    name: "Deluxe King Room",
    description: "Spacious room with a king-size bed and city view",
    price: 200,
    available: true
  },
  {
    name: "Twin Room",
    description: "Comfortable room with two single beds",
    price: 150,
    available: true
  },
  {
    name: "Suite",
    description: "Luxurious suite with separate living area and panoramic views",
    price: 350,
    available: true
  },
  {
    name: "Family Room",
    description: "Large room suitable for families, with one double bed and two single beds",
    price: 250,
    available: true
  },
  {
    name: "Budget Single Room",
    description: "Cozy room for solo travelers",
    price: 100,
    available: true
  }
];

async function addRooms() {
  try {
    await Room.deleteMany({});
    const result = await Room.insertMany(sampleRooms);
    console.log(`${result.length} rooms have been added.`);
  } catch (error) {
    console.error('Error adding rooms:', error);
  } finally {
    mongoose.disconnect();
  }
}

addRooms();