const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll)
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getById);
router.get('/testimonials/', TestimonialController.post);
router.get('/testimonials/:id', TestimonialController.update);
router.get('/testimonials/:id', TestimonialController.delete);

module.exports = router