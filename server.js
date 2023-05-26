const express = require('express');
const cors = require('cors')
const path = require('path')
const socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const contersRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', testimonialsRoutes);
app.use('/api', contersRoutes)
app.use('/api', seatsRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('we got new socket!' + socket.id)

  socket.on('pageEnter', (page) => {
    console.log('Page entered:', page);
  });
})