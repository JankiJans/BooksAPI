const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll)
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.get('/concerts/', ConcertController.post);
router.get('/concerts/:id', ConcertController.update);
router.get('/concerts/:id', ConcertController.delete);

module.exports = router