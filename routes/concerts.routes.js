const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomConcert = db.concerts[randomIndex];
  res.json(randomConcert);
});

router.route('/concerts/:id').get((req, res) => {
  const id = parseInt(req.params.id);
  const concertsId = db.concerts.find((concert) => concert.id === id);
  res.json(concertsId);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newId = db.concerts.length + 1;
  const newConcert = { id: newId, performer, genre, price, day, image};
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  const concertsId = db.concerts.find((concert) => concert.id === id);

  if (concertsId !== -1) {
    db.concerts.splice(concertsId, 1);
    res.status(201).json({ message: 'OK' });
  }
});

module.exports = router;
