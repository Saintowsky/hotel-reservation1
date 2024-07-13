const express = require('express');
const roomController = require('../controllers/room.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, roomController.getRooms);
router.get('/:id', authMiddleware, roomController.getRoom);

module.exports = router;