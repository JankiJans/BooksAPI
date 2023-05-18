const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const testimonials = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req,res) => {
  res.json(testimonials)
})

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * testimonials.length);
  const randomTestimonial = testimonials[randomIndex];
  res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonialId = testimonials.find(testimonial => testimonial.id === id);
  res.json(testimonialId);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newId = testimonials.length + 1;
  const newTestimonial = { id: newId, author, text };
  testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonialId = testimonials.find(testimonial => testimonial.id === id);

  if (testimonialId !== -1) {
    testimonials.splice(testimonialId, 1);
    res.status(201).json({ message: 'OK' });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
